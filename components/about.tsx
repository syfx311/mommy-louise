'use client'

import { Heart, Wallet, PiggyBank, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

const features = [
  {
    icon: Wallet,
    title: 'Custom Budget Envelopes',
    description: 'Beautifully designed envelopes for every category - groceries, bills, savings, and more.',
    color: 'bg-pink-100 border-pink-300',
  },
  {
    icon: Heart,
    title: 'Family-Focused Planning',
    description: 'Templates designed with busy moms in mind. Simple, practical, and easy to maintain.',
    color: 'bg-rose-100 border-rose-300',
  },
  {
    icon: PiggyBank,
    title: 'Visual Savings Tracking',
    description: 'Watch your savings grow with satisfying visual trackers and progress charts.',
    color: 'bg-amber-100 border-amber-300',
  },
  {
    icon: TrendingUp,
    title: 'Financial Freedom',
    description: 'Build healthy money habits that lead to debt-free living and financial peace.',
    color: 'bg-emerald-100 border-emerald-300',
  },
]

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

export function About() {
  return (
    <section id="about" className="py-20 md:py-28 bg-card relative overflow-hidden">
      {/* Decorative bows */}
      <div className="absolute top-10 right-10 opacity-10">
        <DecorativeBow className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-10">
        <DecorativeBow className="w-20 h-20 text-primary" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          variants={fadeInUp}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <DecorativeBow className="w-8 h-8 text-primary opacity-50" />
            <p className="text-primary font-medium">About The Method</p>
            <DecorativeBow className="w-8 h-8 text-primary opacity-50 scale-x-[-1]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-noto-sans text-foreground mb-4 text-balance">
            Why Cash Stuffing Works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Cash stuffing is a hands-on budgeting method where you allocate physical cash into 
            labeled envelopes for different spending categories. It makes budgeting tangible, 
            visual, and incredibly satisfying.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`rounded-2xl p-6 border-2 ${feature.color} transition-all group`}
            >
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="w-12 h-12 rounded-xl bg-card flex items-center justify-center mb-4 shadow-sm"
              >
                <feature.icon className="h-6 w-6 text-primary" />
              </motion.div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Quote Section with gingham pattern */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 gingham-pattern rounded-3xl p-8 md:p-12 text-center border-2 border-primary/20 relative overflow-hidden" style={{ backgroundColor: 'rgba(255, 226, 226, 1)' }}
        >
          <div className="absolute top-4 left-8 opacity-30">
            <DecorativeBow className="w-12 h-12 text-primary" />
          </div>
          <div className="absolute top-4 right-8 opacity-30 scale-x-[-1]">
            <DecorativeBow className="w-12 h-12 text-primary" />
          </div>
          
          <motion.blockquote 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl font-serif text-foreground italic mb-4 text-balance relative z-10"
          >
            &ldquo;Wealth gained hastily will dwindle. But whoever gathers little by little will increase it.&rdquo;
          </motion.blockquote>
          <motion.cite 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-primary font-medium"
          >
            — Proverbs 13:11
          </motion.cite>
        </motion.div>
      </div>
    </section>
  )
}
