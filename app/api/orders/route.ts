import { NextRequest, NextResponse } from 'next/server'
import { sendEmail, emailTemplates } from '@/lib/resend'
import { createOrder, logEmail, updateEmailLog } from '@/lib/database'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      packageName,
      customerName,
      customerEmail,
      customerPhone,
      binderType,
      colors,
      inserts,
      challenges,
      specialRequests,
    } = body

    // Validate required fields
    if (!packageName || !customerName || !customerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields: packageName, customerName, customerEmail' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerEmail)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    // STEP 1: Create order in database FIRST
    const dbResult = await createOrder({
      packageName,
      customerName,
      customerEmail,
      customerPhone,
      binderType,
      colors,
      inserts,
      challenges,
      specialRequests,
    })

    if (!dbResult.success || !dbResult.orderId || !dbResult.orderNumber) {
      console.error('Database error:', dbResult.error)
      return NextResponse.json(
        { error: 'Failed to create order. Please try again.' },
        { status: 500 }
      )
    }

    const orderId = dbResult.orderId
    const orderNumber = dbResult.orderNumber

    // STEP 2: Log email attempt for customer confirmation
    await logEmail(orderId, customerEmail, 'customer_confirmation', `Order Confirmation - ${orderNumber}`)

    // STEP 3: Send customer confirmation email using Resend
    const customerEmailResult = await sendEmail({
      to: customerEmail,
      subject: `Thank You for Your Order - ${orderNumber}`,
      html: emailTemplates.customerConfirmation(customerName, orderNumber, packageName, {
        binderType,
        colors,
        inserts,
        challenges,
        specialRequests,
      }),
    })

    // Update email log with result
    await updateEmailLog(orderId, customerEmail, customerEmailResult.success ? 'sent' : 'failed', customerEmailResult.error)

    // STEP 4: Log and send admin notification (non-blocking)
    if (process.env.ADMIN_EMAIL) {
      await logEmail(orderId, process.env.ADMIN_EMAIL, 'admin_notification', `New Order: ${orderNumber} from ${customerName}`)

      const adminEmailResult = await sendEmail({
        to: process.env.ADMIN_EMAIL,
        subject: `New Order: ${orderNumber} from ${customerName}`,
        html: emailTemplates.adminNotification(customerName, customerEmail, customerPhone, orderNumber, packageName, {
          binderType,
          colors,
          inserts,
          challenges,
          specialRequests,
        }),
      })

      // Update email log with result
      await updateEmailLog(orderId, process.env.ADMIN_EMAIL, adminEmailResult.success ? 'sent' : 'failed', adminEmailResult.error)
    }

    // STEP 5: Return success with order details
    // Note: We return success even if emails fail, because the order is already in the database
    return NextResponse.json(
      {
        success: true,
        message: 'Order submitted successfully',
        orderId,
        orderNumber,
        emailSent: customerEmailResult.success,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Order submission error:', error instanceof Error ? error.message : error)
    return NextResponse.json(
      {
        error: 'Failed to submit order. Please try again.',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}
