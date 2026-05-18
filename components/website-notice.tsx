'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { useState, useEffect } from 'react'

interface WebsiteNoticeProps {
  isPopup?: boolean
}

export function WebsiteNotice({ isPopup = false }: WebsiteNoticeProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isPopup) {
      setIsVisible(true)
    }
  }, [isPopup])

  if (!isVisible) return null

  const handleClose = () => {
    setIsVisible(false)
  }

  if (isPopup) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, type: 'spring', stiffness: 300, damping: 30 }}
            className="bg-card rounded-3xl border-2 border-primary/20 shadow-2xl max-w-md w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b border-primary/20 px-6 py-6 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🚧</span>
                <h2 className="font-serif text-2xl text-foreground">Website Notice</h2>
              </div>
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                className="p-1 hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                aria-label="Close notice"
              >
                <X className="w-6 h-6 text-foreground" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="px-6 py-6 space-y-4">
              <p className="text-foreground text-sm leading-relaxed font-medium">
                Our website is currently under construction as we continue improving your shopping experience.
              </p>

              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>Product pricing shown is temporary and may change without prior notice.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>We are undergoing review and setup for our international payment system.</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary flex-shrink-0">•</span>
                  <span>Some payment methods and checkout features may not yet be available in certain countries.</span>
                </li>
              </ul>

              <p className="text-primary font-serif text-sm pt-2">
                We appreciate your patience and support while we work on launching the full experience soon. 💕
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-primary/10 bg-background/50">
              <motion.button
                onClick={handleClose}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-medium transition-all duration-200 hover:shadow-lg hover:shadow-primary/30"
              >
                Got It, Thanks!
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    )
  }

  return null
}
