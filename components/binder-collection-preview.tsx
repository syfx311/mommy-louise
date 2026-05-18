'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Heart, Star, ChevronLeft, ChevronRight, Zap, Package, Truck } from 'lucide-react'
import { useState } from 'react'

const binderImages = [
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F174b1d1c6c2d43dd80145cc5a3ca4232?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F737b1d8259f944f2bc33f99a69eae200?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F29c95cd0df64421fadb585359962de64?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2Ff7cf16cc946b4cceb07665cd2a6b1462?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F1eeabf6ec07643b988c71a0c50b6c40d?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F579a464d572041d8bb3f870637646b8e?format=webp&width=800&height=1200',
  'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F4fed0d0ca58a462aa2b0d8f508769f86?format=webp&width=800&height=1200',
]

const colorOptions = [
  { id: 'blush', name: 'Blush Pink', color: '#f8d5d2' },
  { id: 'sage', name: 'Sage Green', color: '#b8c5a2' },
  { id: 'lavender', name: 'Lavender', color: '#d4c5e2' },
  { id: 'cream', name: 'Cream', color: '#f5f1ed' },
]

const sizeOptions = [
  { id: 'standard', name: 'Standard (6.5" × 9.5")' },
  { id: 'mini', name: 'Mini (5" × 7")' },
  { id: 'deluxe', name: 'Deluxe (8.5" × 11")' },
]

const accordionItems = [
  {
    id: 'details',
    title: 'Product Details',
    content: 'Premium vegan leather with genuine gold-plated hardware. Features 6 card slots, expandable ring binder system, and luxe lining inside. Each binder is carefully handcrafted to ensure quality and durability.',
  },
  {
    id: 'shipping',
    title: 'Shipping & Returns',
    content: 'Ships within 3-5 business days via USPS Priority Mail. Free returns within 30 days. Insured shipping available at checkout. International shipping available to select countries.',
  },
  {
    id: 'faq',
    title: 'FAQs',
    content: 'Our binders are water-resistant and designed to last. The gold hardware is durable and won\'t tarnish. You can customize your binder with monogramming for an additional fee. Please allow 5-7 business days for monogrammed orders.',
  },
]

export function BinderCollectionPreview() {
  const [mainImageIndex, setMainImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState('blush')
  const [selectedSize, setSelectedSize] = useState('standard')
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null)

  const mainImage = binderImages[mainImageIndex]

  const handlePrevImage = () => {
    setMainImageIndex((prev) => (prev === 0 ? binderImages.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setMainImageIndex((prev) => (prev === binderImages.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="binder-product-section py-12 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 md:mb-12 text-center max-w-2xl mx-auto"
        >
          <h2 className="font-noto-sans text-2xl sm:text-3xl md:text-4xl text-foreground mb-2 md:mb-4">
            <span className="font-signature text-3xl sm:text-4xl md:text-5xl text-primary">Binder Collection</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Explore our premium budget binder with handcrafted leather, elegant design, and functionality built for modern money management.
          </p>
        </motion.div>

        {/* Main Product Container */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
          {/* Left Column - Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-4"
          >
            {/* Main Image Container */}
            <div className="relative group">
              <motion.div
                className="relative aspect-square overflow-hidden rounded-3xl bg-card border-2 border-primary/20 shadow-lg"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={mainImage}
                  alt="Premium Budget Binder"
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-110"
                  priority
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-card/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>

              {/* Navigation Arrows */}
              <button
                onClick={handlePrevImage}
                type="button"
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-1.5 md:p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={handleNextImage}
                type="button"
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white text-primary p-1.5 md:p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 active:scale-95"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Image Counter */}
              <div className="absolute bottom-3 md:bottom-4 left-1/2 -translate-x-1/2 bg-background/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-foreground">
                {mainImageIndex + 1} / {binderImages.length}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-2 snap-x snap-mandatory">
              {binderImages.map((image, index) => (
                <motion.button
                  key={`thumb-${index}`}
                  onClick={() => setMainImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  type="button"
                  className={`relative flex-shrink-0 aspect-square w-16 md:w-24 rounded-lg md:rounded-xl overflow-hidden border-2 transition-all duration-200 snap-center ${
                    index === mainImageIndex
                      ? 'border-primary shadow-lg'
                      : 'border-primary/20 hover:border-primary/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Binder view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6 md:gap-8 md:sticky md:top-24 md:h-fit"
          >
            {/* Rating and Wishlist */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={`star-${i}`}
                      className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary"
                    />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground ml-1">(142 reviews)</span>
              </div>
              <motion.button
                onClick={() => setIsWishlisted(!isWishlisted)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="p-2 rounded-full hover:bg-primary/10 transition-colors"
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
              >
                <Heart
                  className={`w-6 h-6 transition-all ${
                    isWishlisted
                      ? 'fill-primary text-primary'
                      : 'text-muted-foreground hover:text-primary'
                  }`}
                />
              </motion.button>
            </div>

            {/* Product Title */}
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest font-medium text-primary">
                Premium Budget Collection
              </span>
              <h1 className="font-noto-sans text-2xl sm:text-3xl md:text-5xl text-foreground">
                Premium Budget Binder
              </h1>
              <p className="text-muted-foreground mt-2 md:mt-4 text-sm md:text-base">
                Elegant leather binder crafted with premium materials and gold-plated hardware for the modern budgeter.
              </p>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 flex-wrap">
              <span className="text-2xl md:text-4xl font-serif text-primary">$89.00</span>
              <span className="text-base md:text-lg text-muted-foreground line-through">$120.00</span>
              <span className="text-xs md:text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full">
                Save 26%
              </span>
            </div>

            {/* Color Selector */}
            <div className="space-y-2 md:space-y-3">
              <label className="text-xs md:text-sm font-medium text-foreground">
                Color: <span className="text-primary">{colorOptions.find(c => c.id === selectedColor)?.name}</span>
              </label>
              <div className="flex gap-2 md:gap-3">
                {colorOptions.map((option) => (
                  <motion.button
                    key={`color-${option.id}`}
                    onClick={() => setSelectedColor(option.id)}
                    whileHover={{ scale: 1.1 }}
                    type="button"
                    className={`relative group`}
                    aria-label={`Select ${option.name}`}
                    aria-pressed={selectedColor === option.id}
                  >
                    <div
                      className={`w-10 md:w-12 h-10 md:h-12 rounded-full border-2 transition-all duration-200 ${
                        selectedColor === option.id
                          ? 'border-primary shadow-lg shadow-primary/30'
                          : 'border-primary/30 hover:border-primary/50'
                      }`}
                      style={{ backgroundColor: option.color }}
                    />
                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                      {option.name}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-2 md:space-y-3">
              <label className="text-xs md:text-sm font-medium text-foreground">Size</label>
              <div className="space-y-1 md:space-y-2">
                {sizeOptions.map((option) => (
                  <motion.button
                    key={`size-${option.id}`}
                    onClick={() => setSelectedSize(option.id)}
                    whileHover={{ scale: 1.02 }}
                    type="button"
                    className={`w-full text-left px-3 md:px-4 py-2 md:py-3 rounded-lg md:rounded-xl border-2 transition-all duration-200 ${
                      selectedSize === option.id
                        ? 'bg-primary/10 border-primary'
                        : 'bg-card border-primary/20 hover:border-primary/50'
                    }`}
                    aria-pressed={selectedSize === option.id}
                  >
                    <span className="font-medium text-foreground text-xs md:text-sm">{option.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-2 md:space-y-3">
              <label className="text-xs md:text-sm font-medium text-foreground">Quantity</label>
              <div className="flex items-center gap-2 md:gap-3 bg-card rounded-lg md:rounded-xl border-2 border-primary/20 p-1.5 md:p-2 w-fit">
                <motion.button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="p-1 hover:bg-primary/10 rounded transition-colors text-lg"
                  aria-label="Decrease quantity"
                >
                  −
                </motion.button>
                <span className="w-6 md:w-8 text-center font-medium text-foreground text-sm md:text-base">
                  {quantity}
                </span>
                <motion.button
                  onClick={() => setQuantity(quantity + 1)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="p-1 hover:bg-primary/10 rounded transition-colors text-lg"
                  aria-label="Increase quantity"
                >
                  +
                </motion.button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-2 md:gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full bg-primary text-primary-foreground py-3 md:py-4 rounded-lg md:rounded-xl font-medium text-base md:text-lg transition-all duration-200 hover:shadow-lg hover:shadow-primary/30 active:scale-95"
              >
                Add to Cart
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full bg-card border-2 border-primary/30 text-primary py-2.5 md:py-3 rounded-lg md:rounded-xl font-medium transition-all duration-200 hover:bg-primary/10 hover:border-primary active:scale-95"
              >
                Buy Now
              </motion.button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 py-3 md:py-4 border-t border-b border-primary/10">
              {[
                { icon: Zap, label: 'Secure Checkout' },
                { icon: Package, label: 'Handmade' },
                { icon: Truck, label: 'Fast Shipping' },
              ].map((badge) => {
                const IconComponent = badge.icon
                return (
                  <motion.div
                    key={badge.label}
                    whileHover={{ y: -2 }}
                    className="text-center"
                  >
                    <div className="flex justify-center mb-1 md:mb-2">
                      <IconComponent className="w-4 h-4 md:w-5 md:h-5 text-primary" />
                    </div>
                    <p className="text-xs font-medium text-foreground leading-tight">
                      {badge.label}
                    </p>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        </div>

        {/* Customer Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12 md:mt-16 max-w-3xl mx-auto mb-12 md:mb-16"
        >
          <h3 className="text-xl md:text-2xl font-serif text-foreground mb-6 md:mb-8">Customer Reviews</h3>
          <div className="space-y-4">
            {[
              {
                name: 'Sarah M.',
                rating: 5,
                title: 'Absolutely Beautiful!',
                text: 'This binder has transformed my budgeting routine. The quality is premium and the design is so elegant. Highly recommend!',
              },
              {
                name: 'Jessica L.',
                rating: 5,
                title: 'Perfect for Organization',
                text: 'The compartments are perfectly sized and the leather feels so luxurious. Worth every penny!',
              },
              {
                name: 'Amanda K.',
                rating: 5,
                title: 'Great Customer Service',
                text: 'Fast shipping, beautiful packaging, and the binder exceeded my expectations. This is now my favorite piece!',
              },
            ].map((review, index) => (
              <motion.div
                key={`review-${index}`}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-lg md:rounded-xl border border-primary/20 p-4 md:p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground text-sm md:text-base">{review.name}</p>
                    <p className="text-xs md:text-sm text-muted-foreground">{review.title}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={`rating-${i}`} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {review.text}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Accordion Sections */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 md:mt-16 max-w-3xl mx-auto space-y-2 md:space-y-3"
        >
          <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4 md:mb-6">More Information</h3>
          {accordionItems.map((item) => (
            <motion.div
              key={`accordion-${item.id}`}
              className="bg-card rounded-xl border-2 border-primary/20 overflow-hidden"
              initial={false}
            >
              <motion.button
                onClick={() =>
                  setExpandedAccordion(
                    expandedAccordion === item.id ? null : item.id
                  )
                }
                type="button"
                className="w-full px-4 md:px-6 py-3 md:py-4 flex items-center justify-between hover:bg-primary/5 transition-colors active:bg-primary/5"
                aria-expanded={expandedAccordion === item.id}
              >
                <span className="font-medium text-foreground text-left text-sm md:text-base">
                  {item.title}
                </span>
                <motion.div
                  animate={{ rotate: expandedAccordion === item.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRight className="w-5 h-5 text-primary" />
                </motion.div>
              </motion.button>
              <motion.div
                initial={false}
                animate={{
                  height: expandedAccordion === item.id ? 'auto' : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-4 md:px-6 py-3 md:py-4 border-t border-primary/10 text-muted-foreground text-xs md:text-sm leading-relaxed">
                  {item.content}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Related Products Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 md:mt-20 pt-8 md:pt-16 border-t border-primary/10"
        >
          <h3 className="text-xl md:text-2xl font-serif text-foreground mb-4 md:mb-8">
            You Might Also Like
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
            {[
              {
                title: 'Budget Envelope Inserts',
                price: '$15.99',
                image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F3f2dceb91f944d5db35fd45a0c0cde10?format=webp&width=800&height=1200',
              },
              {
                title: 'Premium Dividers Set',
                price: '$24.99',
                image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F693215361ff64879a2f52c74582ee66d?format=webp&width=800&height=1200',
              },
              {
                title: 'Luxury Pen Set',
                price: '$34.99',
                image: 'https://cdn.builder.io/api/v1/image/assets%2F8c358e96430c4451949ddae1cc8ed29a%2F8266e96c8aae4cddb6d583e2b6a960c1?format=webp&width=800&height=1200',
              },
            ].map((product, index) => (
              <motion.div
                key={`related-${index}`}
                whileHover={{ y: -4 }}
                className="group"
              >
                <div className="relative aspect-square rounded-lg md:rounded-2xl overflow-hidden bg-card border-2 border-primary/20 mb-2 md:mb-4">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-medium text-foreground mb-1 md:mb-2 text-sm md:text-base">
                  {product.title}
                </h4>
                <p className="text-base md:text-lg text-primary font-serif">
                  {product.price}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
