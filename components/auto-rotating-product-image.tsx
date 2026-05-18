'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingImage {
  id: number
  src: string
  alt: string
}

interface AutoRotatingProductImageProps {
  rotatingImages: RotatingImage[]
  alt: string
}

export function AutoRotatingProductImage({
  rotatingImages,
  alt,
}: AutoRotatingProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [displayedIndices, setDisplayedIndices] = useState<Set<number>>(new Set([0]))
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!rotatingImages || rotatingImages.length <= 1) return

    const rotateImage = () => {
      setCurrentImageIndex((prevIndex) => {
        const availableIndices = Array.from(
          { length: rotatingImages.length },
          (_, i) => i
        ).filter((i) => !displayedIndices.has(i))

        if (availableIndices.length === 0) {
          // Reset cycle
          const newIndex = Math.floor(Math.random() * rotatingImages.length)
          setDisplayedIndices(new Set([newIndex]))
          return newIndex
        }

        const randomIndex =
          availableIndices[Math.floor(Math.random() * availableIndices.length)]
        setDisplayedIndices((prev) => new Set([...prev, randomIndex]))
        return randomIndex
      })
    }

    rotationIntervalRef.current = setInterval(rotateImage, 3000)

    return () => {
      if (rotationIntervalRef.current) {
        clearInterval(rotationIntervalRef.current)
      }
    }
  }, [rotatingImages, displayedIndices])

  if (!rotatingImages || rotatingImages.length === 0) {
    return null
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          <Image
            src={rotatingImages[currentImageIndex].src}
            alt={rotatingImages[currentImageIndex].alt}
            fill
            className="object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Counter badge */}
      <motion.div className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium z-10">
        {displayedIndices.size} / {rotatingImages.length}
      </motion.div>
    </div>
  )
}
