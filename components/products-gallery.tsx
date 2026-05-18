'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Sparkles, Heart, ShoppingBag, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'stationery', label: 'Stationery' },
  { id: 'planners', label: 'Budget Planners' },
  { id: 'stickers', label: 'Stickers' },
  { id: 'essentials', label: 'Home Essentials' },
  { id: 'custom', label: 'Custom Orders' },
]

const envelopeInsertTiles = [
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3f2dceb91f944d5db35fd45a0c0cde10?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fe649da41462a4c538ba0aff8ab3f4c40?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fa83299145c1f4926ba880787739d0629?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F9a2ced2b30f14ede83e65e6638055fb1?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fb19d0ec3276c4c7da9620542a6fae275?format=webp&width=800&height=1200',
]

const binderTiles = [
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F174b1d1c6c2d43dd80145cc5a3ca4232?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F737b1d8259f944f2bc33f99a69eae200?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F29c95cd0df64421fadb585359962de64?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Ff7cf16cc946b4cceb07665cd2a6b1462?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F1eeabf6ec07643b988c71a0c50b6c40d?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F579a464d572041d8bb3f870637646b8e?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F4fed0d0ca58a462aa2b0d8f508769f86?format=webp&width=800&height=1200',
]

const products = [
  {
    id: 1,
    title: 'Budget Envelope Inserts',
    description: 'Beautiful pink gingham cash envelopes with custom categories',
    category: 'stationery',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3f2dceb91f944d5db35fd45a0c0cde10?format=webp&width=800&height=1200',
    tiles: envelopeInsertTiles,
    features: ['Customizable Categories', 'Premium Cardstock', 'Gingham Design'],
    badge: 'Best Seller',
    fullDescription: 'Handcrafted budget envelope inserts designed to organize your cash stuffing method. Features soft pink gingham pattern with clearly labeled budget categories.',
    colors: ['Pink', 'Beige', 'Purple'],
  },
  {
    id: 2,
    title: 'Premium Budget Binders',
    description: 'Elegant leather binders with gold ring mechanisms and card slots',
    category: 'planners',
    image: '/images/budget-binders.png',
    tiles: binderTiles,
    features: ['Multiple Colors', 'Card Pockets', 'Gold Rings'],
    badge: 'Premium',
    fullDescription: 'Luxurious leather budget planner binders with premium craftsmanship. Includes removable card pockets and sturdy gold ring mechanisms.',
    colors: ['Pink', 'Purple', 'Beige', 'Sage Green'],
  },
  {
    id: 3,
    title: 'Decorative Budget Stickers',
    description: 'Cute and motivating stickers for budget tracking and planning',
    category: 'stickers',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fa375720d57914db4befdd6fec37e8cfb?format=webp&width=800&height=1200',
    features: ['150+ Designs', 'Waterproof', 'Removable'],
    badge: 'New',
    fullDescription: 'Adorable waterproof sticker sheet featuring budget-themed designs perfect for planners and envelopes.',
    colors: ['Mixed'],
  },
  {
    id: 4,
    title: 'Monthly Savings Tracker',
    description: 'Beautiful printable monthly savings and budget tracking sheets',
    category: 'stationery',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3414467aad2847d2ada40c2452e1142a?format=webp&width=800&height=1200',
    features: ['Printable', 'Customizable', 'Set of 12'],
    badge: '',
    fullDescription: 'Monthly tracker sheets with space for goal tracking, savings breakdown, and spending notes.',
    colors: ['White/Pink'],
  },
  {
    id: 5,
    title: 'Custom Budget Set',
    description: 'Personalized budget system tailored to your needs',
    category: 'custom',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F5e00e5fb62d9406aa0ea777d62e48d0c?format=webp&width=800&height=1200',
    features: ['Fully Customized', 'Your Colors', 'Your Design'],
    badge: 'Made to Order',
    fullDescription: 'Create your perfect budget system with custom colors, designs, and layout. Perfect for personal use or as a gift.',
    colors: ['Custom'],
  },
  {
    id: 6,
    title: 'Desk Organizer Bundle',
    description: 'Complete home office setup with budget planning essentials',
    category: 'essentials',
    image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Fc455b93c553b40a384752fa000208e62?format=webp&width=800&height=1200',
    features: ['Multi-Piece Set', 'Storage Included', 'Aesthetic Design'],
    badge: 'Value Set',
    fullDescription: 'Complete desk organization bundle including pen holder, note pads, and sticky notes in coordinated soft colors.',
    colors: ['Pink & Cream', 'Purple & Beige'],
  },
]

function Bow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 60" className={className} fill="none">
      <path
        d="M50 30 C30 10, 5 15, 10 30 C15 45, 35 40, 50 30"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M50 30 C70 10, 95 15, 90 30 C85 45, 65 40, 50 30"
        fill="currentColor"
        opacity="0.3"
      />
      <path
        d="M50 30 C30 10, 5 15, 10 30 C15 45, 35 40, 50 30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M50 30 C70 10, 95 15, 90 30 C85 45, 65 40, 50 30"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="50" cy="30" r="6" fill="currentColor" />
      <path d="M46 36 Q50 55, 48 58" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M54 36 Q50 55, 52 58" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  )
}

interface SelectedProduct {
  id: number
  title: string
  description: string
  category: string
  image: string
  tiles?: string[]
  features: string[]
  badge: string
  fullDescription: string
  colors: string[]
}

function ProductDetailModal({ product, isOpen, onClose }: { product: SelectedProduct | null; isOpen: boolean; onClose: () => void }) {
  const [quantity, setQuantity] = useState(1)
  const [orderNotes, setOrderNotes] = useState('')

  if (!product) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-background rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="sticky top-0 right-0 flex justify-end p-4 bg-background border-b border-border/20 z-10">
              <button
                onClick={onClose}
                className="p-2 hover:bg-secondary rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6 md:p-8">
              {/* Product Image */}
              <div className="relative aspect-square rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-primary/5 to-accent/5">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                {product.badge && (
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                      <Sparkles className="w-4 h-4" />
                      {product.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Product Details */}
              <h2 className="font-noto-sans text-3xl md:text-4xl text-foreground mb-4">
                {product.title}
              </h2>

              <p className="text-muted-foreground mb-6 text-lg">
                {product.fullDescription}
              </p>

              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Features</h3>
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="inline-flex items-center gap-1 text-sm bg-primary/10 text-primary px-3 py-1 rounded-full"
                    >
                      <Heart className="w-3 h-3 fill-primary" />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <h3 className="font-semibold text-foreground mb-3">Available Colors</h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <span key={color} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
                      {color}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity and Notes */}
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center border border-border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-4 py-2 hover:bg-secondary transition-colors"
                    >
                      −
                    </button>
                    <span className="px-4 py-2 flex-1 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-4 py-2 hover:bg-secondary transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Order Notes (Optional)
                </label>
                <textarea
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Add any special requests or details..."
                  className="w-full rounded-lg border border-border p-3 text-foreground placeholder:text-muted-foreground resize-none"
                  rows={3}
                />
              </div>

              {/* CTA Button */}
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-6 text-lg"
              >
                <Link href="#contact">Send Inquiry</Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function ProductsGallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedProduct, setSelectedProduct] = useState<SelectedProduct | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter(p => p.category === activeCategory)

  const bestSellers = products.filter(p => p.badge === 'Best Seller')

  return (
    <section id="products" className="py-20 md:py-28 relative overflow-hidden">
      {/* Gingham Background */}
      <div className="absolute inset-0 gingham-pattern opacity-30" />

      {/* Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 text-primary/20"
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
      >
        <Bow className="w-20 h-12" />
      </motion.div>
      <motion.div
        className="absolute bottom-32 right-10 text-primary/20"
        animate={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Bow className="w-24 h-14" />
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-3">
            <Bow className="w-12 h-8 text-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Shop Our Collection
            </span>
            <Bow className="w-12 h-8 text-primary transform scale-x-[-1]" />
          </div>
          <h1 className="font-noto-sans text-4xl md:text-5xl lg:text-6xl text-foreground mb-3 text-balance">
            Our <span className="font-signature text-5xl md:text-6xl lg:text-7xl text-primary">Products</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Affordable, aesthetic, and thoughtfully curated items for everyday use
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-16"
        >
          {CATEGORIES.map((category) => (
            <motion.button
              key={category.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-2 rounded-full font-medium text-sm transition-all ${
                activeCategory === category.id
                  ? 'bg-primary text-primary-foreground shadow-lg'
                  : 'bg-secondary text-foreground hover:bg-secondary/80 border border-primary/20'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Best Sellers Carousel */}
        {bestSellers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="font-noto-sans text-2xl md:text-3xl text-foreground mb-2">
                ⭐ <span className="text-primary">Best Sellers</span>
              </h2>
              <p className="text-muted-foreground">Customer favorites and most loved items</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellers.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="cursor-pointer"
                  onClick={() => {
                    setSelectedProduct(product)
                    setIsModalOpen(true)
                  }}
                >
                  <div className="bg-card rounded-2xl border border-primary/20 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                      <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {product.badge && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                            <Sparkles className="w-3 h-3" />
                            {product.badge}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-4 flex flex-col h-full">
                      <h3 className="font-noto-sans text-lg text-foreground mb-1 line-clamp-2">
                        {product.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3 line-clamp-1 flex-1">
                        {product.description}
                      </p>
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                      >
                        Inquire
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Product Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                whileHover={{ y: -8 }}
                onClick={() => {
                  setSelectedProduct(product)
                  setIsModalOpen(true)
                }}
                className="cursor-pointer"
              >
                <div className="bg-card rounded-2xl border border-primary/10 overflow-hidden shadow-md hover:shadow-xl hover:border-primary/30 transition-all duration-300 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-primary/5 to-accent/5">
                    <Image
                      src={product.image}
                      alt={product.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-3 left-3">
                        <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                          <Sparkles className="w-3 h-3" />
                          {product.badge}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-noto-sans text-lg text-foreground mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-1">
                      {product.description}
                    </p>

                    {/* Features - only show for featured products */}
                    {filteredProducts.indexOf(product) < 3 && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.features.slice(0, 2).map((feature) => (
                          <span
                            key={feature}
                            className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto">
                      <Button
                        size="sm"
                        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                      >
                        Inquire
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground text-lg mb-4">
              No products found in this category.
            </p>
            <Button
              onClick={() => setActiveCategory('all')}
              variant="outline"
              className="border-primary/30 hover:bg-primary/10"
            >
              View All Products
            </Button>
          </motion.div>
        )}

        {/* Link to Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-20 mb-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl border border-primary/20 p-8 md:p-12 text-center"
        >
          <h2 className="font-noto-sans text-2xl md:text-3xl text-foreground mb-4">
            Explore Our Complete <span className="text-primary">Design Gallery</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            View our full collection of 50+ unique designs, color palettes, and custom templates
          </p>
          <Link href="/gallery" className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors font-medium">
            Visit Gallery
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16"
        >
          {[
            { label: 'Designs Available', value: '50+' },
            { label: 'Happy Customers', value: '100+' },
            { label: 'Custom Orders', value: '200+' },
            { label: 'Binder Colors', value: '30+' },
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
            Ready to Transform Your <span className="text-primary">Budget?</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Connect with us to order your favorite products or create a custom budget system tailored just for you.
          </p>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg"
          >
            <Link href="#contact">Get Started Today</Link>
          </Button>
        </motion.div>
      </div>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  )
}
