import { Resend } from 'resend'

let resendClient: any = null

function getResend() {
  if (!resendClient) {
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.warn('RESEND_API_KEY is not configured')
      return null
    }
    resendClient = new Resend(apiKey)
  }
  return resendClient
}

export interface EmailLogData {
  orderId: string
  recipientEmail: string
  emailType: 'customer_confirmation' | 'admin_notification' | 'shipping_update'
  subject: string
}

export async function sendEmail({
  to,
  subject,
  html,
}: {
  to: string
  subject: string
  html: string
}): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    if (!process.env.RESEND_API_KEY) {
      return {
        success: false,
        error: 'Resend API key not configured',
      }
    }

    const client = getResend()
    if (!client) {
      return {
        success: false,
        error: 'Resend API key not configured',
      }
    }

    const response = await client.emails.send({
      from: 'Mommy Louise Budget PH <orders@resend.dev>',
      to,
      subject,
      html,
    })

    if (response.error) {
      console.error('Resend error:', response.error)
      return {
        success: false,
        error: response.error.message,
      }
    }

    return {
      success: true,
      messageId: response.data?.id,
    }
  } catch (error) {
    console.error('Email sending error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send email',
    }
  }
}

export const emailTemplates = {
  customerConfirmation: (
    customerName: string,
    orderNumber: string,
    packageName: string,
    orderDetails: {
      binderType?: string
      colors?: string
      inserts?: string
      challenges?: string
      specialRequests?: string
    }
  ) => {
    const detailsHtml = Object.entries(orderDetails)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        const labelMap: Record<string, string> = {
          binderType: 'Binder Type',
          colors: 'Colors',
          inserts: 'Inserts',
          challenges: 'Challenges',
          specialRequests: 'Special Requests',
        }
        return `<tr><td style="padding: 8px 0; border-bottom: 1px solid #e8dcd9;"><strong>${labelMap[key]}:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e8dcd9;">${value}</td></tr>`
      })
      .join('')

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
          body { margin: 0; padding: 0; background: #f9f7f5; font-family: 'Poppins', sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #d4a5a5 0%, #c9888d 100%); padding: 40px 20px; text-align: center; }
          .header h1 { margin: 0; color: white; font-size: 32px; font-weight: 700; letter-spacing: -0.5px; }
          .header p { margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; }
          .content { padding: 40px; color: #35302e; }
          .greeting { font-size: 18px; margin: 0 0 20px 0; }
          .greeting strong { color: #d4a5a5; }
          .order-number { background: #f9f7f5; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: center; }
          .order-number .label { font-size: 12px; color: #888; text-transform: uppercase; letter-spacing: 1px; }
          .order-number .number { font-size: 28px; font-weight: 700; color: #d4a5a5; font-family: monospace; }
          .order-box { background: #f9f7f5; border-left: 4px solid #d4a5a5; padding: 20px; border-radius: 4px; margin: 30px 0; }
          .order-box h3 { margin: 0 0 15px 0; color: #d4a5a5; font-size: 16px; }
          .order-details table { width: 100%; border-collapse: collapse; }
          .order-details td { padding: 8px 0; }
          .message { font-size: 15px; line-height: 1.6; color: #555; margin: 20px 0; }
          .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e8dcd9; }
          .signature p { margin: 0; font-size: 14px; color: #555; }
          .signature strong { color: #d4a5a5; }
          .footer { background: #f9f7f5; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e8dcd9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✨ Order Received!</h1>
            <p>We're excited to create your custom binder</p>
          </div>

          <div class="content">
            <p class="greeting">Hi <strong>${customerName}</strong>,</p>

            <p class="message">
              Thank you for your order! We've received your request for a <strong>${packageName}</strong> and we're thrilled to bring your vision to life.
            </p>

            <div class="order-number">
              <div class="label">Order Number</div>
              <div class="number">${orderNumber}</div>
            </div>

            <div class="order-box">
              <h3>📦 Your Order Details</h3>
              <div class="order-details">
                <table>
                  <tr><td style="padding: 8px 0; border-bottom: 1px solid #e8dcd9;"><strong>Package:</strong></td><td style="padding: 8px 0; border-bottom: 1px solid #e8dcd9;">${packageName}</td></tr>
                  ${detailsHtml}
                </table>
              </div>
            </div>

            <p class="message">
              Our team is now preparing your custom order. We'll keep you updated with progress and will contact you if we have any questions about your special requests.
            </p>

            <p class="message">
              If you need to make any changes or have questions, please reply to this email right away. We're here to help!
            </p>

            <div class="signature">
              <p>With love & gratitude,</p>
              <p><strong>Mommy Louise's Budget PH Team</strong></p>
              <p style="margin-top: 10px; font-size: 12px;">Making budgeting beautiful, one binder at a time ✨</p>
            </div>
          </div>

          <div class="footer">
            <p style="margin: 0;">Questions? Reply to this email or contact us on our website.</p>
            <p style="margin: 8px 0 0 0;">© 2024 Mommy Louise's Budget PH. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `
  },

  adminNotification: (
    customerName: string,
    customerEmail: string,
    customerPhone: string | undefined,
    orderNumber: string,
    packageName: string,
    orderDetails: {
      binderType?: string
      colors?: string
      inserts?: string
      challenges?: string
      specialRequests?: string
    }
  ) => {
    const detailsHtml = Object.entries(orderDetails)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        const labelMap: Record<string, string> = {
          binderType: 'Binder Type',
          colors: 'Colors',
          inserts: 'Inserts',
          challenges: 'Challenges',
          specialRequests: 'Special Requests',
        }
        return `<tr><td style="padding: 10px; border-bottom: 1px solid #e0e0e0;"><strong>${labelMap[key]}:</strong></td><td style="padding: 10px; border-bottom: 1px solid #e0e0e0;">${value}</td></tr>`
      })
      .join('')

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body { margin: 0; padding: 0; background: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background: white; }
          .header { background: linear-gradient(135deg, #d4a5a5 0%, #c9888d 100%); padding: 30px 20px; text-align: center; color: white; }
          .header h1 { margin: 0; font-size: 28px; font-weight: 600; }
          .content { padding: 30px; }
          .alert { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px; }
          .section { margin: 25px 0; }
          .section-title { font-size: 14px; font-weight: 600; color: #333; text-transform: uppercase; letter-spacing: 0.5px; margin: 15px 0 10px 0; }
          .customer-info { background: #f9f9f9; padding: 15px; border-radius: 4px; }
          .customer-info p { margin: 8px 0; font-size: 14px; }
          .customer-info strong { color: #333; }
          .order-details table { width: 100%; border-collapse: collapse; }
          .order-details table tr { border-bottom: 1px solid #e0e0e0; }
          .order-details table td { padding: 10px; font-size: 14px; }
          .order-number { background: #f0f0f0; padding: 15px; border-radius: 4px; text-align: center; margin: 15px 0; }
          .order-number .label { font-size: 12px; color: #666; text-transform: uppercase; }
          .order-number .number { font-size: 24px; font-weight: 700; color: #d4a5a5; font-family: monospace; margin-top: 5px; }
          .action-link { display: inline-block; background: #d4a5a5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; margin: 20px 0; font-weight: 600; }
          .footer { background: #f9f9f9; padding: 20px; text-align: center; font-size: 12px; color: #666; border-top: 1px solid #e0e0e0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎉 New Order Received!</h1>
          </div>

          <div class="content">
            <div class="alert">
              <strong>Action Required:</strong> A new customer order has arrived and needs processing.
            </div>

            <div class="section">
              <div class="section-title">Customer Information</div>
              <div class="customer-info">
                <p><strong>Name:</strong> ${customerName}</p>
                <p><strong>Email:</strong> <a href="mailto:${customerEmail}">${customerEmail}</a></p>
                ${customerPhone ? `<p><strong>Phone:</strong> ${customerPhone}</p>` : ''}
              </div>
            </div>

            <div class="section">
              <div class="order-number">
                <div class="label">Order #</div>
                <div class="number">${orderNumber}</div>
              </div>
            </div>

            <div class="section">
              <div class="section-title">Order Details</div>
              <div class="order-details">
                <table>
                  <tr>
                    <td style="font-weight: 600;">Package</td>
                    <td>${packageName}</td>
                  </tr>
                  ${detailsHtml}
                </table>
              </div>
            </div>

            <a href="https://mommy-louise.vercel.app/admin" class="action-link">View in Admin Dashboard</a>

            <p style="font-size: 12px; color: #666; margin-top: 20px;">
              Access the admin dashboard to update order status, add notes, and manage customer communication.
            </p>
          </div>

          <div class="footer">
            <p>© 2024 Mommy Louise's Budget PH Admin Notification</p>
          </div>
        </div>
      </body>
      </html>
    `
  },
}
