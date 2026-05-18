'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Send, CheckCircle, Facebook, Youtube } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion, AnimatePresence } from 'framer-motion'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
}

// Bow SVG component
function DecorativeBow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 60 50" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M30 25C30 25 15 15 10 20C5 25 10 35 15 35C20 35 30 25 30 25Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M30 25C30 25 45 15 50 20C55 25 50 35 45 35C40 35 30 25 30 25Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M30 25C30 25 25 35 27 45"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M30 25C30 25 35 35 33 45"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="30" cy="25" r="3" fill="currentColor" />
    </svg>
  )
}

// TikTok Logo SVG component
function TikTokLogo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.68v13.67a2.4 2.4 0 1 1-2.4-2.4c.4 0 .8.04 1.2.12V9.41a7.26 7.26 0 0 0-1.2-.12A7.26 7.26 0 0 0 5 16.67a7.26 7.26 0 0 0 7.26 7.26 7.26 7.26 0 0 0 7.26-7.26V12.6a9.6 9.6 0 0 0 3.77 1.5v-3.88a4.84 4.84 0 0 1-3.3-1.53z" />
    </svg>
  )
}

export function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to submit contact form')
      }

      setSubmitted(true)
      setTimeout(() => {
        setSubmitted(false)
        setFormData({
          name: '',
          email: '',
          message: '',
        })
      }, 3000)
    } catch (error) {
      console.error('Contact submission error:', error)
      alert('Failed to submit contact form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="py-20 md:py-28 bg-card relative overflow-hidden" style={{ backgroundColor: 'rgba(255, 222, 222, 1)' }}>
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <DecorativeBow className="w-16 h-16 text-primary" />
      </div>
      <div className="absolute bottom-20 right-10 opacity-10 scale-x-[-1]">
        <DecorativeBow className="w-20 h-20 text-primary" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
            variants={fadeInUp}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <DecorativeBow className="w-8 h-8 text-primary opacity-50" />
              <p className="text-primary font-medium">Get Started</p>
              <DecorativeBow className="w-8 h-8 text-primary opacity-50 scale-x-[-1]" />
            </div>
            <h2 className="text-3xl md:text-4xl font-noto-sans text-foreground mb-4 text-balance">
              Ready to Transform Your Finances?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Let&apos;s create your personalized budget templates. Fill out the form below and 
              I&apos;ll help you get started on your cash stuffing journey.
            </p>
          </motion.div>

          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring' }}
                className="gingham-pattern rounded-2xl p-8 text-center border-2 border-primary/20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                </motion.div>
                <motion.h3 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-xl font-semibold text-foreground mb-2"
                >
                  Thank You!
                </motion.h3>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="text-muted-foreground"
                >
                  Your message has been received. I&apos;ll get back to you within 24-48 hours 
                  to discuss your personalized budget templates.
                </motion.p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                onSubmit={handleSubmit} 
                className="bg-background rounded-2xl p-6 md:p-8 border-2 border-primary/20 shadow-sm"
              >
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Maria Santos"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-card border-primary/20 rounded-xl transition-all focus:scale-[1.01] focus:border-primary"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="maria@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-card border-primary/20 rounded-xl transition-all focus:scale-[1.01] focus:border-primary"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                  >
                    <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                      Tell me about your budget goals
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="I want to save for... My budget categories include..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all focus:scale-[1.01]"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block animate-spin mr-2">⏳</span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Start My Budget Journey
                        </>
                      )}
                    </Button>
                  </motion.div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="gingham-pattern border-t-2 border-primary/20 py-12"
      style={{ backgroundColor: 'rgba(253, 209, 209, 1)' }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-3"
          >
            <Image
              src="/images/logo.png"
              alt="Mommy Louise's Budget PH"
              width={50}
              height={50}
              className="rounded-full border-2 border-primary/30"
            />
            <div>
              <span className="font-serif text-foreground block leading-tight" style={{ fontFamily: 'Grand Hotel, sans-serif', fontSize: '27px' }}>Mommy Louise&apos;s</span>
              <span className="text-xs text-primary font-medium tracking-wider uppercase">Budget PH</span>
            </div>
          </motion.div>
          
          <p className="text-sm text-muted-foreground text-center">
            © {new Date().getFullYear()}&nbsp;Mommy Louise&apos;s Budget PH
          </p>

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm text-muted-foreground">
              Follow us on our social media accounts
            </p>
            <div className="flex gap-4">
              <motion.a
                href="https://www.facebook.com/profile.php?id=100087797289721"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit our Facebook page"
              >
                <Facebook className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.tiktok.com/@mommylouiseee"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit our TikTok profile"
              >
                <TikTokLogo className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="https://www.youtube.com/channel/UCHFl5W8x4mgy5LiEkiu0UCw"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Visit our YouTube channel"
              >
                <Youtube className="h-5 w-5" />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
