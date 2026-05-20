'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { DesignLibraryShowcase } from '@/components/design-library-showcase'

function ProductCardShowcase({ products }: { products: any[] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const rotationIntervalRef = useRef<NodeJS.Timeout>()

  useEffect(() => {
    rotationIntervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % products.length)
    }, 5000)

    return () => clearInterval(rotationIntervalRef.current!)
  }, [products.length])

  const currentProduct = products[currentIndex]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-20"
    >
      <div className="text-center mb-12">
        <h2 className="font-noto-sans text-2xl md:text-3xl text-foreground mb-2">
          Featured <span className="font-signature text-3xl md:text-4xl text-primary">Products</span>
        </h2>
        <p className="text-muted-foreground">
          Curated stationery and planning essentials
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        {/* Featured Product Card */}
        <motion.div
          key={currentProduct.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-3xl bg-card border border-primary/20 shadow-lg"
        >
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
            <Image
              src={currentProduct.src}
              alt={currentProduct.alt}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Product Grid Carousel */}
        <div className="space-y-6">
          <div>
            <p className="text-muted-foreground text-sm mb-2">Featured</p>
            <h3 className="font-noto-sans text-xl md:text-2xl text-foreground">
              {currentProduct.alt}
            </h3>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {products.map((product, index) => (
              <motion.button
                key={product.id}
                onClick={() => {
                  setCurrentIndex(index)
                  clearInterval(rotationIntervalRef.current!)
                  rotationIntervalRef.current = setInterval(() => {
                    setCurrentIndex((prev) => (prev + 1) % products.length)
                  }, 5000)
                }}
                whileHover={{ scale: 1.05 }}
                className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-primary bg-primary/10'
                    : 'border-primary/20 hover:border-primary/50'
                }`}
              >
                <Image
                  src={product.src}
                  alt={product.alt}
                  fill
                  className="object-cover"
                />
              </motion.button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground">
            View more of our collection. Automatically rotates every 5 seconds.
          </p>

          <Link href="#contact" className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium w-full">
            Inquire About This Product
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

const productImages = [
  { id: 1, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F313588b12fa643ec8299f5e0d28dfa32?format=webp&width=800&height=1200', alt: 'Stickers Collection' },
  { id: 2, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F0472cdc4311e45f096617a26651d7a74?format=webp&width=800&height=1200', alt: 'Budget Binder Setup' },
  { id: 3, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F30598e7f51fb4ad39faad340649a09fa?format=webp&width=800&height=1200', alt: 'Planning Inserts' },
  { id: 4, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F174d3edaf0494e83902a9270632757ef?format=webp&width=800&height=1200', alt: 'Calendar Design' },
  { id: 5, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fc67b7d31ae1f45c7b15c1f4ddc343e02?format=webp&width=800&height=1200', alt: 'Household Budget' },
  { id: 6, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fdbfa4dde55b24cb09f6c8f892898d0d3?format=webp&width=800&height=1200', alt: 'Budget Templates' },
  { id: 7, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F07f7d0a0a0e444e09b1ebb7df259754a?format=webp&width=800&height=1200', alt: 'Hello Kitty Binder' },
  { id: 8, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F71932b83a6be46cf8a408174d8e787b8?format=webp&width=800&height=1200', alt: 'Time to Budget' },
  { id: 9, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fd5929455d126441e8d68c990c3fddb1d?format=webp&width=800&height=1200', alt: 'Savings Challenge Kit' },
  { id: 10, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F44fdb59efd1d4fa88136e7703257400a?format=webp&width=800&height=1200', alt: 'A Penny Saved Binder' },
  { id: 11, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F29a5ef29e2a446cd8db02baa0237d13e?format=webp&width=800&height=1200', alt: 'Kids Daily Allowance' },
  { id: 12, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fe538d7f246e74d6db79ccea9da24c79a?format=webp&width=800&height=1200', alt: 'Flower Budget Planner' },
]

const designImages = [
  { id: 1, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fc7105fef800b4637876202ef11a2d508?format=webp&width=800&height=1200', alt: 'Emergency Funds Design' },
  { id: 2, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F693215361ff64879a2f52c74582ee66d?format=webp&width=800&height=1200', alt: 'Budget Envelope Insert' },
  { id: 3, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F8266e96c8aae4cddb6d583e2b6a960c1?format=webp&width=800&height=1200', alt: 'Budget Binder Design' },
  { id: 4, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fd09509dc10a84edbbc57eababafe6ba2?format=webp&width=800&height=1200', alt: 'Seasonal Budget' },
  { id: 5, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fd4962b456bd14788846c02c810e1f9a4?format=webp&width=800&height=1200', alt: 'Monthly Savings Plan' },
  { id: 6, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F1f903ad41cb94b28acae567467461196?format=webp&width=800&height=1200', alt: 'Pink Budget Design' },
  { id: 7, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F24ca4eb7bd5e4e3fbb864c7017acda3a?format=webp&width=800&height=1200', alt: 'Monthly Challenge' },
  { id: 8, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F9a2da6acd34048848ba5e1cb37b5b6af?format=webp&width=800&height=1200', alt: 'Scheduler Design' },
  { id: 9, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fe0b894f42f5c4c38a478fcb763879a5e?format=webp&width=800&height=1200', alt: 'Savings Envelope' },
  { id: 10, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fdddf6dfefb9e47a7ab4aa8a55b28f9cd?format=webp&width=800&height=1200', alt: 'Budget Cards' },
  { id: 11, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F8dd2c505d9864ba4a4a06e5e4c7233b6?format=webp&width=800&height=1200', alt: 'Financial Planning' },
  { id: 12, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F939f19cf0d524c02bc528b4be882329a?format=webp&width=800&height=1200', alt: 'Binder Collection' },
  { id: 13, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fa2b7792628fa45ea8f49ed25a11d465f?format=webp&width=800&height=1200', alt: 'Budget Planner' },
  { id: 14, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3414467aad2847d2ada40c2452e1142a?format=webp&width=800&height=1200', alt: 'Monthly Tracker' },
  { id: 15, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fe9385f198d294bf99f5422bc2331a04e?format=webp&width=800&height=1200', alt: 'Savings Goals' },
  { id: 16, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F5e00e5fb62d9406aa0ea777d62e48d0c?format=webp&width=800&height=1200', alt: 'Budget Inserts' },
  { id: 17, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fee9b8333d8ef44f6afb7003128e0640f?format=webp&width=800&height=1200', alt: 'Digital Planning' },
  { id: 18, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3923d80910e3486a9070594a394b123a?format=webp&width=800&height=1200', alt: 'Aesthetic Budget' },
  { id: 19, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F44749ffcb9674e488dc0f4888bff9ab6?format=webp&width=800&height=1200', alt: 'Pink Savings' },
  { id: 20, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fd55f3916d7d446c68a5aaf1637f2ddb7?format=webp&width=800&height=1200', alt: 'Budget Essentials' },
  { id: 21, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fa375720d57914db4befdd6fec37e8cfb?format=webp&width=800&height=1200', alt: 'Money Tracker' },
  { id: 22, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fdca22a41742849ec9b7f8d3e605dc62d?format=webp&width=800&height=1200', alt: 'Financial Tools' },
  { id: 23, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F8bbf39e5f040445db0a3f21f65d5ec05?format=webp&width=800&height=1200', alt: 'Budget Set' },
  { id: 24, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fef3a1eaa069b4f71816fc9b596f2a5b7?format=webp&width=800&height=1200', alt: 'Planning System' },
  { id: 25, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F21d84b2add5d4687803a591a068b7cdc?format=webp&width=800&height=1200', alt: 'Savings Tracker' },
  { id: 26, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F49219545737c44c5957a4da30c8004e9?format=webp&width=800&height=1200', alt: 'Monthly Goals' },
  { id: 27, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fb98f69e5d3514272887f09e4e795dd80?format=webp&width=800&height=1200', alt: 'Budget Templates' },
  { id: 28, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3af04f8f8c7b4fd3847efeffeb731a4c?format=webp&width=800&height=1200', alt: 'Financial Design' },
  { id: 29, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F73b9b07de7fd4a1b84ada5d32b0a857d?format=webp&width=800&height=1200', alt: 'Planner Kit' },
  { id: 30, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F9a740892cf52408bb3bdb671d51dae3e?format=webp&width=800&height=1200', alt: 'Savings Design' },
  { id: 31, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F22cc5aa0b662482c8f1d540b982b90e0?format=webp&width=800&height=1200', alt: 'Budget Art' },
  { id: 32, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fd369392e0cab40f39d528bc9b21e9b54?format=webp&width=800&height=1200', alt: 'Pink Planner' },
  { id: 33, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F45235815fdba41769e63d4b6979ee4f4?format=webp&width=800&height=1200', alt: 'Themed Design' },
  { id: 34, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fa5096065eb5949af830c2bc6aef5ad1c?format=webp&width=800&height=1200', alt: 'Budget Setup' },
  { id: 35, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F9302c878cbaa4b5c929a296659158290?format=webp&width=800&height=1200', alt: 'Money Organization' },
  { id: 36, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fc455b93c553b40a384752fa000208e62?format=webp&width=800&height=1200', alt: 'Financial Envelopes' },
  { id: 37, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F276c28591d59458fbb4629fab20ea874?format=webp&width=800&height=1200', alt: 'Budget Cards Kit' },
  { id: 38, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F17d7a41d776d423c9a719894f4a96977?format=webp&width=800&height=1200', alt: 'Planning Cards' },
  { id: 39, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F71307bb8ee6647d596f8c614ecd087a0?format=webp&width=800&height=1200', alt: 'Savings Challenge' },
  { id: 40, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F92b5289f27db4c4cbc0a704e7c1b9209?format=webp&width=800&height=1200', alt: 'Budget Showcase' },
  { id: 41, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Ffac27d7ec64c4622b4364ec382af41ff?format=webp&width=800&height=1200', alt: 'Planning System Kit' },
  { id: 42, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F38126ddf45394c94910993d4b67f1fc8?format=webp&width=800&height=1200', alt: 'Monthly Plan' },
  { id: 43, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F413b51a0d0d34184938eda53d68f97d9?format=webp&width=800&height=1200', alt: 'Financial Planning Set' },
  { id: 44, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F8f4239940913414eb29f26f46e38d06b?format=webp&width=800&height=1200', alt: 'Budget Art Inserts' },
  { id: 45, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F7b22fccba1fa4914ae55f8b4ec4a26ae?format=webp&width=800&height=1200', alt: 'Artistic Budget' },
  { id: 46, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F6a55c74076a8418e83ad07f4800d4f70?format=webp&width=800&height=1200', alt: 'Design Collection' },
  { id: 47, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F60dc9be469d34b8ea8f6fdf021551872?format=webp&width=800&height=1200', alt: 'Financial Tools Kit' },
  { id: 48, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F4f73cc2f0e2b4ee0b5b324ef792465a4?format=webp&width=800&height=1200', alt: 'Budget Planning' },
  { id: 49, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fc78be7ad3c4646fb87ea32904758b59f?format=webp&width=800&height=1200', alt: 'Money Manager' },
  { id: 50, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F8e08ef747ac441fca570dfb4e167ccd0?format=webp&width=800&height=1200', alt: 'Savings System' },
  { id: 51, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fcbaae64e0af347f6ae237ccb5b4e2360?format=webp&width=800&height=1200', alt: 'Budget Design Pro' },
  { id: 52, src: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F5400618744fc403fb12e91029cb56a4f?format=webp&width=800&height=1200', alt: 'Complete Collection' },
]

export function GalleryShowcase() {
  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Gingham Background */}
      <div className="absolute inset-0 gingham-pattern opacity-30" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="font-noto-sans text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 text-balance">
            Design <span className="font-signature text-5xl md:text-6xl lg:text-7xl text-primary">Gallery</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Explore our complete collection of beautiful designs and custom templates
          </p>
        </motion.div>

        {/* Main Design Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <DesignLibraryShowcase images={designImages} />
        </motion.div>

        {/* Product Card Showcase */}
        <ProductCardShowcase products={productImages} />

        {/* Binder Color Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20"
        >
          <div className="text-center mb-12">
            <h2 className="font-noto-sans text-2xl md:text-3xl text-foreground mb-2">
              Binder <span className="font-signature text-3xl md:text-4xl text-primary">Color Collection</span>
            </h2>
            <p className="text-muted-foreground">
              Beautiful colors and finishes to match your style
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              { id: 1, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120424_850-furUdYC4pJdfAbOfPpOdYvdSX7htOR.jpg', alt: 'Sage Green Binder Closed' },
              { id: 2, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120504_239-oS9bc5OGfmURAOduRfqlklgFkO3hOa.jpg', alt: 'Pink Binder Open Interior' },
              { id: 3, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120307_737-P07wSWy5Jp7EM9kwZUIUn8A8qenIrf.jpg', alt: 'Beige Quilted Binder Closed' },
              { id: 4, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120459_119-Gu7QPS4PzkH8ar2zQMwrBaWqrzJZcP.jpg', alt: 'Rose Pink Binder Closed' },
              { id: 5, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120312_914-2Iywj65o8bBwGtYdvFn75R6LRZIfxm.jpg', alt: 'Tan Binder Open Interior' },
              { id: 6, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120431_070-YyWtujD4rhqbwo736mxZrPo0yRHqOd.jpg', alt: 'Sage Green Binder Open Interior' },
              { id: 7, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120213_930-cWnxIhcisXNo4gR4nX2lBRYasJyj5H.jpg', alt: 'Purple and Pink Binders Comparison' },
              { id: 8, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_212621_7-HQYtwwZ1HBhUee4GG4SbJFoSBrfBXA.jpg', alt: 'Binder Collection Display Basket' },
              { id: 9, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120449_915-UiHdFgragHi3iDW9Wu8BA0ZI4U5OoM.jpg', alt: 'Beige Binder Open Interior' },
              { id: 10, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260513_135513_931-pnTHzMlijgQhh5gopOTq4ZsKVM5Yzg.jpg', alt: 'Accessories and Jewelry Display' },
              { id: 11, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120444_125-W3BVGhGHRIn8LsPhNV2sd3RlHjNtJg.jpg', alt: 'Pink and Blue Binders Side by Side' },
              { id: 12, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120147_614-geTqEoY1gLHSbAh5nORanxfxUMyX5W.jpg', alt: 'Tan Binder Open Detail' },
              { id: 13, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120335_753-2CLitT741ZaNMWpf3UU2jIQIpok7gb.jpg', alt: 'Tan Binder with Yellow Rings' },
              { id: 14, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120407_618-Cpr01Y6Mo2CxEgZsGiKtN8JrUp9jAI.jpg', alt: 'Brown Textured Binder Open' },
              { id: 15, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120350_361-2ilqTUziIY6Cr8jmEuCb3iSI33Uq0s.jpg', alt: 'Brown Binder Closed View' },
              { id: 16, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120344_170-zz2GGXDSqBYnHSldx73l9q8Mb87wRs.jpg', alt: 'Brown Lizard Textured Binder' },
              { id: 17, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120359_953-HXbjXgxBNTjsSCgZtIt2bSDYCxutEJ.jpg', alt: 'Cream Binder Closed View' },
              { id: 18, src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/IMG_20260512_120328_126-wjuD1hMiBkTsK9YyEdFwZEZL2wTbyt.jpg', alt: 'Cream Textured Wallet Binder' },
            ].map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4 }}
                className="relative group overflow-hidden rounded-2xl bg-card border border-primary/10 hover:border-primary/30 transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-16"
        >
          {[
            { label: 'Designs', value: '52+' },
            { label: 'Colors', value: '30+' },
            { label: 'Custom Orders', value: '200+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/20 p-4 text-center"
            >
              <div className="font-serif text-2xl md:text-3xl text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 bg-gradient-to-br from-primary/10 to-accent/10 rounded-3xl border border-primary/20 p-8 md:p-12 text-center"
        >
          <h2 className="font-noto-sans text-2xl md:text-3xl text-foreground mb-4">
            Looking for a Custom <span className="text-primary">Design?</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            All our designs can be customized to match your brand, colors, and vision. Let's create something perfect for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/products" className="inline-flex items-center justify-center px-8 py-3 bg-secondary border border-primary/20 text-foreground rounded-full hover:bg-secondary/80 transition-colors font-medium">
              Browse Products
            </Link>
            <Link href="#contact" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium">
              Request Custom Design
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
