import type { Metadata, Viewport } from 'next'
import { Geist, Playfair_Display, Noto_Sans_Adlam, Noto_Sans, DM_Sans, Allura, Grand_Hotel } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'

const geist = Geist({
  subsets: ["latin"],
  variable: '--font-geist'
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
})

const notoSansAdlam = Noto_Sans_Adlam({
  subsets: ["latin"],
  variable: '--font-noto-sans-adlam',
  weight: ['400', '500', '600', '700']
})

const notoSans = Noto_Sans({
  subsets: ["latin"],
  variable: '--font-noto-sans',
  weight: ['400', '500', '600', '700']
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['400', '500', '600', '700']
})

const allura = Allura({
  subsets: ["latin"],
  variable: '--font-handwrite',
  weight: ['400']
})

const grandHotel = Grand_Hotel({
  subsets: ["latin"],
  variable: '--font-grand-hotel',
  weight: ['400']
})

export const metadata: Metadata = {
  title: 'Mommy Louise Budget | Cash Stuffing & Budget Templates',
  description: 'Take control of your money with beautiful cash stuffing templates and budget envelopes. Simple, visual, and satisfying way to manage your family finances.',
  keywords: ['cash stuffing', 'budget envelopes', 'family budget', 'money management', 'savings'],
  authors: [{ name: 'Mommy Louise' }],
  openGraph: {
    title: 'Mommy Louise Budget | Cash Stuffing & Budget Templates',
    description: 'Take control of your money with beautiful cash stuffing templates and budget envelopes.',
    type: 'website',
  },
  icons: {
    icon: [
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export const viewport: Viewport = {
  themeColor: '#e85a8f',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${geist.variable} ${playfair.variable} ${notoSansAdlam.variable} ${notoSans.variable} ${dmSans.variable} ${allura.variable} ${grandHotel.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
