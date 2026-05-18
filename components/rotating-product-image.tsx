'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

interface RotatingImage {
  id: number
  src: string
  alt: string
}

interface RotatingProductImageProps {
  staticFallback: string
  rotatingImages?: RotatingImage[]
  alt: string
}

export function RotatingProductImage({
  staticFallback,
  rotatingImages,
  alt,
}: RotatingProductImageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [displayedIndices, setDisplayedIndices] = useState<Set<number>>(new Set([0]))
  const rotationIntervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isHovering || !rotatingImages || rotatingImages.length <= 1) return

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
  }, [isHovering, rotatingImages, displayedIndices])

  const handleMouseEnter = () => {
    if (rotatingImages && rotatingImages.length > 1) {
      setIsHovering(true)
    }
  }

  const handleMouseLeave = () => {
    setIsHovering(false)
    if (rotationIntervalRef.current) {
      clearInterval(rotationIntervalRef.current)
    }
    setCurrentImageIndex(0)
    setDisplayedIndices(new Set([0]))
  }

  const imagesToShow = rotatingImages || []
  const currentImage = imagesToShow[currentImageIndex] || null

  return (
    <div
      className="relative w-full h-full overflow-hidden group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <AnimatePresence mode="wait">
        {currentImage ? (
          <motion.div
            key={currentImage.id}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            <Image
              src={currentImage.src}
              alt={currentImage.alt}
              fill
              className="object-cover"
            />
          </motion.div>
        ) : (
          <Image
            src={staticFallback}
            alt={alt}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        )}
      </AnimatePresence>

      {/* Hover hint */}
      {rotatingImages && rotatingImages.length > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovering ? 0 : 0.5 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/10 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center text-white text-xs font-medium">
            Hover to see colors
          </div>
        </motion.div>
      )}

      {/* Counter badge */}
      {rotatingImages && rotatingImages.length > 1 && (
        <motion.div
          animate={{ opacity: isHovering ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-3 right-3 bg-primary/90 text-primary-foreground px-2 py-1 rounded-full text-xs font-medium z-10"
        >
          {displayedIndices.size} / {rotatingImages.length}
        </motion.div>
      )}
    </div>
  )
}
