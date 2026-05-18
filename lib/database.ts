import { supabase } from '@/lib/supabase'

export interface OrderData {
  packageName: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  binderType?: string
  colors?: string
  inserts?: string
  challenges?: string
  specialRequests?: string
  shippingAddress?: Record<string, any>
  totalPrice?: number
  notes?: string
}

// Generate a readable order number like ML-2026-000123
function generateOrderNumber(sequence: number): string {
  const year = new Date().getFullYear()
  const paddedSequence = String(sequence).padStart(6, '0')
  return `ML-${year}-${paddedSequence}`
}

export async function createOrder(
  data: OrderData
): Promise<{ success: boolean; orderId?: string; orderNumber?: string; error?: string }> {
  try {
    if (!supabase) {
      return { success: false, error: 'Database connection failed' }
    }

    // 1. Get or create customer
    const { data: existingCustomer, error: fetchError } = await supabase
      .from('customers')
      .select('id')
      .eq('email', data.customerEmail)
      .single()

    let customerId: string

    if (fetchError && fetchError.code !== 'PGRST116') {
      // PGRST116 = no rows returned (expected for new customers)
      console.error('Customer fetch error:', fetchError)
      return { success: false, error: 'Failed to check customer' }
    }

    if (existingCustomer) {
      customerId = existingCustomer.id as string

      // Update customer if needed
      await supabase
        .from('customers')
        .update({
          name: data.customerName,
          phone: data.customerPhone || null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', customerId)
    } else {
      // Create new customer
      const { data: newCustomer, error: customerError } = await supabase
        .from('customers')
        .insert({
          email: data.customerEmail,
          name: data.customerName,
          phone: data.customerPhone || null,
        })
        .select('id')
        .single()

      if (customerError || !newCustomer) {
        console.error('Customer creation error:', customerError)
        return { success: false, error: 'Failed to create customer record' }
      }

      customerId = (newCustomer as { id: string }).id
    }

    // 2. Generate order number
    const { count } = await supabase
      .from('orders')
      .select('id', { count: 'exact', head: true })

    const sequence = count || 0
    const orderNumber = generateOrderNumber(sequence + 1)

    // 3. Create order
    const { data: newOrder, error: orderError } = await supabase
      .from('orders')
      .insert({
        customer_id: customerId,
        order_number: orderNumber,
        package_name: data.packageName,
        binder_type: data.binderType || null,
        colors: data.colors || null,
        inserts: data.inserts || null,
        challenges: data.challenges || null,
        special_requests: data.specialRequests || null,
        shipping_address: data.shippingAddress || null,
        total_price: data.totalPrice || 0,
        notes: data.notes || null,
        order_status: 'pending',
        payment_status: 'unpaid',
      })
      .select('id')
      .single()

    if (orderError || !newOrder) {
      console.error('Order creation error:', orderError)
      return { success: false, error: 'Failed to create order' }
    }

    const orderId = (newOrder as { id: string }).id

    // 4. Create order item
    await supabase.from('order_items').insert({
      order_id: orderId,
      product_name: data.packageName,
      quantity: 1,
      unit_price: data.totalPrice || 0,
      total_price: data.totalPrice || 0,
    })

    return {
      success: true,
      orderId,
      orderNumber,
    }
  } catch (error) {
    console.error('Order creation error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create order',
    }
  }
}

export async function logEmail(
  orderId: string,
  recipientEmail: string,
  emailType: 'customer_confirmation' | 'admin_notification' | 'shipping_update',
  subject: string,
  status: 'pending' | 'sent' | 'failed' = 'pending',
  errorMessage?: string
) {
  try {
    if (!supabase) return

    await supabase.from('email_logs').insert({
      order_id: orderId,
      recipient_email: recipientEmail,
      email_type: emailType,
      subject,
      status,
      error_message: errorMessage || null,
    })
  } catch (error) {
    console.error('Email log error:', error)
  }
}

export async function updateEmailLog(
  orderId: string,
  recipientEmail: string,
  status: 'sent' | 'failed' | 'retrying',
  errorMessage?: string
) {
  try {
    if (!supabase) return

    const { error } = await supabase
      .from('email_logs')
      .update({
        status,
        error_message: errorMessage || null,
        sent_at: status === 'sent' ? new Date().toISOString() : null,
        updated_at: new Date().toISOString(),
      })
      .eq('order_id', orderId)
      .eq('recipient_email', recipientEmail)

    if (error) console.error('Email log update error:', error)
  } catch (error) {
    console.error('Email log update error:', error)
  }
}

export async function getOrderByNumber(orderNumber: string) {
  try {
    if (!supabase) return null

    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_number', orderNumber)
      .single()

    if (error) {
      console.error('Get order error:', error)
      return null
    }

    return data
  } catch (error) {
    console.error('Get order error:', error)
    return null
  }
}

export async function updateOrderStatus(
  orderId: string,
  orderStatus: string,
  paymentStatus?: string,
  adminNotes?: string
) {
  try {
    if (!supabase) return { success: false }

    const updateData: Record<string, any> = {
      order_status: orderStatus,
      updated_at: new Date().toISOString(),
    }

    if (paymentStatus) updateData.payment_status = paymentStatus
    if (adminNotes) updateData.admin_notes = adminNotes

    const { error } = await supabase
      .from('orders')
      .update(updateData)
      .eq('id', orderId)

    if (error) {
      console.error('Update order error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Update order error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update order' }
  }
}
