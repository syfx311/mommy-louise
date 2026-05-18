import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

interface SendEmailProps {
  to: string
  subject: string
  html: string
}

export async function sendEmail({ to, subject, html }: SendEmailProps) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email credentials not configured')
      return { success: false, error: 'Email service not configured' }
    }

    await transporter.sendMail({
      from: `"Mommy Louise's Budget PH" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    })

    return { success: true }
  } catch (error) {
    console.error('Email error:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Failed to send email' }
  }
}

export const emailTemplates = {
  thankYou: (customerName: string, orderDetails: string, packageName: string) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        body { margin: 0; padding: 0; background: #f9f7f5; }
        .container { max-width: 600px; margin: 0 auto; background: white; }
        .header { background: linear-gradient(135deg, #d4a5a5 0%, #c9888d 100%); padding: 40px 20px; text-align: center; }
        .header h1 { margin: 0; color: white; font-size: 32px; font-family: 'Poppins', sans-serif; font-weight: 700; letter-spacing: -0.5px; }
        .header p { margin: 8px 0 0 0; color: rgba(255,255,255,0.9); font-size: 14px; font-family: 'Poppins', sans-serif; }
        .content { padding: 40px; font-family: 'Poppins', sans-serif; color: #35302e; }
        .greeting { font-size: 18px; margin: 0 0 20px 0; }
        .greeting strong { color: #d4a5a5; }
        .message { font-size: 15px; line-height: 1.6; color: #555; margin: 20px 0; }
        .order-box { background: #f9f7f5; border-left: 4px solid #d4a5a5; padding: 20px; border-radius: 4px; margin: 30px 0; }
        .order-box h3 { margin: 0 0 15px 0; color: #d4a5a5; font-size: 16px; }
        .order-details p { margin: 8px 0; font-size: 14px; }
        .order-details strong { color: #35302e; }
        .cta-text { margin: 30px 0; text-align: center; }
        .signature { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e8dcd9; }
        .signature p { margin: 0; font-size: 14px; color: #555; }
        .signature strong { color: #d4a5a5; }
        .footer { background: #f9f7f5; padding: 20px; text-align: center; font-size: 12px; color: #888; border-top: 1px solid #e8dcd9; }
        .divider { height: 2px; background: linear-gradient(to right, transparent, #d4a5a5, transparent); margin: 30px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>✨ Thank You!</h1>
          <p>We're so excited to bring your vision to life</p>
        </div>

        <div class="content">
          <p class="greeting">Hi <strong>${customerName}</strong>,</p>

          <p class="message">
            We've received your order and we're thrilled you've chosen Mommy Louise's Budget PH! Your customized <strong>${packageName}</strong> is going to be absolutely beautiful.
          </p>

          <div class="order-box">
            <h3>📦 Your Order Details</h3>
            <div class="order-details">
              ${orderDetails}
            </div>
          </div>

          <p class="message">
            We'll be carefully crafting your order and will keep you updated every step of the way. You can expect to hear from us soon with exciting updates about your custom creation.
          </p>

          <p class="message">
            If you have any questions or special instructions, don't hesitate to reply to this email. We're here to help make your experience amazing!
          </p>

          <div class="divider"></div>

          <div class="signature">
            <p>With love & gratitude,</p>
            <p><strong>Mommy Louise's Budget PH Team</strong></p>
            <p style="margin-top: 10px; font-size: 12px;">Making budgeting beautiful, one binder at a time ✨</p>
          </div>
        </div>

        <div class="footer">
          <p style="margin: 0;">Questions? Reply to this email or visit our website for more info.</p>
          <p style="margin: 8px 0 0 0;">© 2024 Mommy Louise's Budget PH. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `,

  adminNotification: (customerName: string, customerEmail: string, packageName: string, orderDetails: string) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #333; padding: 20px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">New Order Received</h1>
      </div>
      <div style="padding: 20px; background: #f9f9f9;">
        <h3>Order Details:</h3>
        <p><strong>Customer Name:</strong> ${customerName}</p>
        <p><strong>Customer Email:</strong> ${customerEmail}</p>
        <p><strong>Package:</strong> ${packageName}</p>
        <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
          ${orderDetails}
        </div>
        <p><a href="${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/admin" style="color: #667eea;">View in Admin Dashboard</a></p>
      </div>
    </div>
  `,
}
