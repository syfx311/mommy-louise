'use client'

import { motion } from 'framer-motion'

const steps = [
  {
    number: '01',
    title: 'Choose Your Categories',
    description: 'Select the budget categories that fit your family needs - groceries, utilities, savings, self-care, and more.',
  },
  {
    number: '02',
    title: 'Get Your Templates',
    description: 'Receive beautifully designed, personalized budget envelopes and trackers tailored to your specific categories.',
  },
  {
    number: '03',
    title: 'Stuff Your Cash',
    description: 'When you receive your income, divide it into your labeled envelopes. Each envelope holds cash for its designated purpose.',
  },
  {
    number: '04',
    title: 'Watch Your Savings Grow',
    description: 'Track your progress, celebrate wins, and watch your financial goals become reality month after month.',
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

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-10">
        <DecorativeBow className="w-20 h-20 text-primary" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-10 scale-x-[-1]">
        <DecorativeBow className="w-16 h-16 text-primary" />
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
            <p className="text-primary font-medium">The Process</p>
            <DecorativeBow className="w-8 h-8 text-primary opacity-50 scale-x-[-1]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-noto-sans text-foreground mb-4 text-balance">
            How Cash Stuffing Works
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            A simple four-step process to transform your relationship with money and 
            build lasting financial habits for your family.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div 
              key={step.number} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative"
            >
              {/* Animated connector line */}
              {index < steps.length - 1 && (
                <motion.div 
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                  className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-primary/10 -translate-x-4 origin-left" 
                />
              )}
              
              <div className="relative bg-card rounded-2xl p-6 border-2 border-primary/10 hover:border-primary/30 transition-colors">
                <motion.span 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: 'spring', 
                    stiffness: 200, 
                    delay: 0.2 + index * 0.15 
                  }}
                  className="text-5xl font-bold text-primary/20 inline-block"
                >
                  {step.number}
                </motion.span>
                <h3 className="font-semibold text-foreground text-lg mt-4 mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
