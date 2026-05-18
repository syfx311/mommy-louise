'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ShowcaseImage {
  id: number
  src: string
  alt: string
}

interface DesignLibraryShowcaseProps {
  images: ShowcaseImage[]
  onBowComponent?: React.ReactNode
}

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

export function DesignLibraryShowcase({ images }: DesignLibraryShowcaseProps) {
  const [currentImageIndices, setCurrentImageIndices] = useState<number[]>([0, 1, 2, 3, 4])
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const rotateImages = () => {
      setCurrentImageIndices((prevIndices) => {
        const newIndices = prevIndices.map((idx) => (idx + 5) % images.length)
        return newIndices
      })
    }

    rotationIntervalRef.current = setInterval(rotateImages, 3000)

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current)
      }
    }
  }, [images.length])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="bg-card rounded-3xl border-2 border-primary/20 overflow-hidden shadow-xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 p-6 text-center border-b border-primary/10">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Star className="w-5 h-5 text-primary fill-primary" />
            <span className="text-sm font-medium text-primary uppercase tracking-wider">
              Full Collection
            </span>
            <Star className="w-5 h-5 text-primary fill-primary" />
          </div>
          <h3 className="font-noto-sans text-2xl md:text-3xl text-foreground">
            Browse Our{' '}
            <span className="font-signature text-3xl md:text-4xl text-primary">
              Complete Design Library
            </span>
          </h3>
        </div>

        {/* Image Grid Container - 5 tiles auto-rotating */}
        <div className="relative aspect-[20/6] md:aspect-[25/6] overflow-hidden">
          <div className="w-full h-full grid grid-cols-5 gap-0">
            {currentImageIndices.map((imageIndex) => (
              <motion.div
                key={imageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, ease: 'easeInOut' }}
                className="relative overflow-hidden"
              >
                <Image
                  src={images[imageIndex].src}
                  alt={images[imageIndex].alt}
                  fill
                  className="object-cover"
                />
              </motion.div>
            ))}
          </div>

          {/* Counter badge */}
          <div className="absolute top-4 right-4 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-sm font-medium z-10">
            {currentImageIndices[0] + 1} / {images.length}
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-6 bg-gradient-to-r from-primary/5 via-transparent to-primary/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-foreground font-medium">
              {images.length}+ unique designs available
            </p>
            <p className="text-muted-foreground text-sm">
              New designs rotate every 3 seconds. Custom orders welcome!
            </p>
          </div>
          <Button
            asChild
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg"
          >
            <Link href="#contact" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Order Custom Design
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  )
}
