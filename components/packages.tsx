'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Heart, Sparkles, Download, Printer, MessageCircle, Facebook } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { OrderModal } from '@/components/order-modal'

// TikTok Logo SVG component
function TikTokLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 1 1-2.4-2.4c.4 0 .8.04 1.2.12V9.41a7.26 7.26 0 0 0-1.2-.12A7.26 7.26 0 0 0 5 16.67a7.26 7.26 0 0 0 7.26 7.26 7.26 7.26 0 0 0 7.26-7.26V12.6a9.6 9.6 0 0 0 3.77 1.5v-3.88a4.84 4.84 0 0 1-3.3-1.53z" />
    </svg>
  )
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const scaleHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02 }
}

// Decorative ribbon
function DecorativeRibbon({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative inline-block w-full px-4">
      <div
        className="relative rounded-2xl overflow-hidden shadow-lg py-4 px-8"
        style={{
          background: 'linear-gradient(135deg, #e869ab 0%, #db7ba8 100%)'
        }}
      >
        {/* Ribbon tails */}
        <div className="absolute -left-4 top-1/2 transform -translate-y-1/2">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '8px solid transparent',
              borderRight: '8px solid #db7ba8',
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent'
            }}
          />
        </div>
        <div className="absolute -right-4 top-1/2 transform -translate-y-1/2">
          <div
            className="w-0 h-0"
            style={{
              borderLeft: '8px solid #db7ba8',
              borderRight: '8px solid transparent',
              borderTop: '12px solid transparent',
              borderBottom: '12px solid transparent'
            }}
          />
        </div>

        <div className="relative z-10 text-center text-primary-foreground font-bold text-2xl md:text-3xl">
          {children}
        </div>
      </div>
    </div>
  )
}

// Package card component
function PackageCard({
  title,
  badge,
  features,
  image,
  isPopular,
  onOrderClick
}: {
  title: string
  badge?: string
  features: string[]
  image: React.ReactNode
  isPopular?: boolean
  onOrderClick: () => void
}) {
  return (
    <motion.div
      variants={scaleHover}
      initial="rest"
      whileHover="hover"
      className={`relative h-full rounded-3xl overflow-hidden transition-all duration-300 ${
        isPopular
          ? 'ring-2 ring-primary shadow-2xl'
          : 'shadow-lg hover:shadow-xl'
      }`}
      style={{
        background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.8) 0%, rgba(255, 200, 220, 0.3) 100%)'
      }}
    >
      {/* Badge */}
      {badge && isPopular && (
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="absolute top-4 right-4 z-10"
        >
          <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg">
            <Heart className="w-3 h-3 fill-current" />
            {badge}
          </div>
        </motion.div>
      )}

      {/* Card Content */}
      <div className="p-6 flex flex-col h-full">
        {/* Image Area */}
        <div className="mb-6 flex-shrink-0 h-48 flex items-center justify-center bg-gradient-to-br from-pink-100/40 to-rose-100/40 rounded-2xl border-2 border-pink-200/40 overflow-hidden">
          {image}
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-foreground mb-4">
          {title}
        </h3>

        {/* Features List */}
        <ul className="space-y-2 mb-6 flex-grow">
          {features.map((feature, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-start gap-3 text-sm text-muted-foreground"
            >
              <Heart className="w-4 h-4 text-primary flex-shrink-0 mt-0.5 fill-primary" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onOrderClick}
            className={`w-full rounded-full font-semibold transition-all ${
              isPopular
                ? 'bg-gradient-to-r from-primary to-rose-500 hover:from-primary/90 hover:to-rose-600 text-primary-foreground shadow-lg'
                : 'bg-pink-200/60 hover:bg-pink-300/60 text-foreground'
            }`}
          >
            Order Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}

function PremiumPackageImage() {
  return (
    <div className="premium-package-img-wrapper">
      <Image
        src="https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F2ed6502fa9814452944e4c6aa119e796?format=webp&width=800&height=1200"
        alt="Premium Package"
        width={280}
        height={420}
        className="premium-package-img"
        priority
      />
    </div>
  )
}

function SophiePackageImage() {
  return (
    <div className="sophie-package-img-wrapper">
      <Image
        src="https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3060276967c449fcba661dc39b4142d9?format=webp&width=800&height=1200"
        alt="Sophie Package"
        width={280}
        height={420}
        className="sophie-package-img"
        priority
      />
    </div>
  )
}

function ElegancePackageImage() {
  return (
    <div className="elegance-package-img-wrapper">
      <Image
        src="https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F1373a388724947b3bdcef125b1240bad?format=webp&width=800&height=1200"
        alt="Elegance Package"
        width={280}
        height={420}
        className="elegance-package-img"
        priority
      />
    </div>
  )
}

function MysticPackageImage() {
  return (
    <div className="mystic-package-img-wrapper">
      <Image
        src="https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F580f45d62d4c4d9f95b5b8a5e2cf5eb7?format=webp&width=800&height=1200"
        alt="Mystic Package"
        width={280}
        height={420}
        className="mystic-package-img"
        priority
      />
    </div>
  )
}

export function Packages() {
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openOrderModal = (packageName: string) => {
    setSelectedPackage(packageName)
    setIsModalOpen(true)
  }

  const closeOrderModal = () => {
    setIsModalOpen(false)
    setSelectedPackage(null)
  }

  const packages = [
    {
      title: 'Premium Package',
      badge: 'Most Popular',
      features: [
        'A6 or A7 premium tri-fold binder',
        '10 self-zipping envelopes',
        '10 bespoke inserts',
        '1 customized frontis piece',
        'Matching dividers',
        'Acrylic pen',
        'Bling charm'
      ],
      image: <PremiumPackageImage />,
      isPopular: true
    },
    {
      title: 'Sophie Package',
      features: [
        'A6 soft leather binder',
        '10 envelopes',
        '10 inserts',
        '1 signature dashboard',
        '2 dividers',
        'Thoughtful surprises'
      ],
      image: <SophiePackageImage />
    },
    {
      title: 'Elegance Package',
      features: [
        'A6 looseleaf binder',
        '12 custom laminated envelopes',
        '12 inserts',
        'Choice of challenge (12-Month / Weekly / Theme-Based)',
        'Hand-matched to your order'
      ],
      image: <ElegancePackageImage />
    },
    {
      title: 'Mystic Package',
      features: [
        'A7 transparent looseleaf binder',
        '10 envelopes',
        '10 inserts',
        '2 dashboards',
        'Effortless elegance for your budget journey'
      ],
      image: <MysticPackageImage />
    }
  ]

  return (
    <section id="packages" className="relative py-20 md:py-32 overflow-hidden bg-white">
      {/* Full-width frosted glass overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0, rotate: -45 }}
        whileInView={{ opacity: 0.15, rotate: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute top-10 right-10 text-6xl pointer-events-none"
      >
        ✨
      </motion.div>
      <motion.div
        initial={{ opacity: 0, rotate: 45 }}
        whileInView={{ opacity: 0.15, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="absolute bottom-20 left-10 text-5xl pointer-events-none"
      >
        💝
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          {/* Ribbon with heading */}
          <motion.div
            variants={fadeInUp}
            className="relative mb-8 w-full"
          >
            <DecorativeRibbon>Planning to Order?</DecorativeRibbon>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Explore our customizable budgeting packages and choose the perfect setup for your money journey.
          </motion.p>
        </motion.div>

        {/* Package Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          {packages.map((pkg, index) => (
            <motion.div key={pkg.title} variants={fadeInUp}>
              <PackageCard
                {...pkg}
                onOrderClick={() => openOrderModal(pkg.title)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Order Modal */}
        {selectedPackage && (
          <OrderModal
            isOpen={isModalOpen}
            onClose={closeOrderModal}
            packageName={selectedPackage}
          />
        )}

        {/* Digital & Printable Options */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <motion.h3
            variants={fadeInUp}
            className="text-center text-2xl md:text-3xl font-bold text-foreground mb-8"
          >
            <Heart className="w-6 h-6 text-primary fill-primary inline mr-2" />
            Digital & Printable Options
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Soft Copies */}
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl p-8 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 200, 220, 0.15) 0%, rgba(255, 240, 245, 0.3) 100%)',
                border: '2px solid rgba(232, 105, 171, 0.2)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-block mb-4 p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-50"
              >
                <Download className="w-8 h-8 text-primary" />
              </motion.div>
              <h4 className="text-2xl font-bold text-foreground mb-3">Soft Copies</h4>
              <p className="text-muted-foreground mb-4">
                Printable digital files in A6 and A7 sizes — perfect for DIY budgeting lovers who love to personalize!
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Instant digital download
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Print and laminate at home
                </li>
              </ul>
            </motion.div>

            {/* Printed Copies */}
            <motion.div
              variants={fadeInUp}
              className="rounded-3xl p-8 text-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 200, 220, 0.15) 0%, rgba(255, 240, 245, 0.3) 100%)',
                border: '2px solid rgba(232, 105, 171, 0.2)'
              }}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="inline-block mb-4 p-4 rounded-2xl bg-gradient-to-br from-pink-100 to-rose-50"
              >
                <Printer className="w-8 h-8 text-primary" />
              </motion.div>
              <h4 className="text-2xl font-bold text-foreground mb-3">Printed Copies</h4>
              <p className="text-muted-foreground mb-4">
                We print and prepare everything for you — ready to organize and use right out of the box!
              </p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Bespoke designs
                </li>
                <li className="flex items-center justify-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" /> Ready to use
                </li>
              </ul>
            </motion.div>
          </div>
        </motion.div>

        {/* Customization Info Box */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="rounded-3xl p-8 md:p-10 mb-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.6) 0%, rgba(255, 220, 235, 0.4) 100%)',
            border: '2px solid rgba(232, 105, 171, 0.3)',
            boxShadow: '0 8px 32px rgba(232, 105, 171, 0.1)'
          }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <Heart className="w-8 h-8 text-primary fill-primary" />
          </motion.div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Every Package is Customizable
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Choose your preferred binder style, customize inserts with budget trackers, savings challenges, or personalized themes. Mix and match anything to match your unique financial journey and aesthetic preferences.
          </p>
        </motion.div>

        {/* Final CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Want to Order?
            </h3>
            <p className="text-lg text-muted-foreground">
              Message us now
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="ml-2 inline-block"
              >
                💕
              </motion.span>
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-primary to-rose-500 hover:from-primary/90 hover:to-rose-600 text-primary-foreground rounded-full px-8 py-6 font-semibold shadow-lg"
              >
                <a href="https://www.facebook.com/profile.php?id=100087797289721" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <Facebook className="w-5 h-5" />
                  Message via Facebook
                </a>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                asChild
                className="bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-full px-8 py-6 font-semibold shadow-lg"
              >
                <a href="https://www.tiktok.com/@mommylouiseee" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                  <TikTokLogo className="w-5 h-5" />
                  Message on TikTok
                </a>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
