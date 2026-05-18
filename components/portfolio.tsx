'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import { motion } from 'framer-motion'

const templates = [
  {
    id: 1,
    title: 'Family Budget Essentials',
    client: 'The Reyes Family',
    description: 'Complete household budget with out-of-town trips, insurance, utilities, and emergency fund tracking.',
    categories: ['Out of Town Trips', 'Insurance', 'Electric Bill', 'Water Bill', 'Mortgage', 'Credit Card', 'Palengke', 'Emergency Fund'],
    color: 'bg-pink-100',
    borderColor: 'border-pink-300',
  },
  {
    id: 2,
    title: 'Monthly Household Budget',
    client: 'Cary Budget',
    description: 'Comprehensive monthly planning with groceries, utilities, transportation, and self-care categories.',
    categories: ['Market', 'Groceries', 'Transportation', 'Utilities', 'LPG', 'Rice', 'Association Dues', 'Self-Care', 'Shopping'],
    color: 'bg-rose-100',
    borderColor: 'border-rose-300',
  },
  {
    id: 3,
    title: 'Simple Savings Tracker',
    client: 'GLY Budget',
    description: 'Focused budget template with essentials and dedicated savings and self-care allocations.',
    categories: ['Groceries', 'Food/Palengke', 'Shopping', 'Snacks/Eating Out', 'Buffer', 'Gas', 'Savings', 'Self-Care'],
    color: 'bg-amber-100',
    borderColor: 'border-amber-300',
  },
  {
    id: 4,
    title: 'Priority-Based Budget',
    client: 'Bethel Budget',
    description: 'High and low priority system for smart allocation with giving, health care, and education tracking.',
    categories: ['Groceries', 'Household Salaries', 'School Allowance', 'Giving/Tithing', 'Education', 'Health Care', 'Personal Care', 'Eating Out'],
    color: 'bg-emerald-100',
    borderColor: 'border-emerald-300',
  },
  {
    id: 5,
    title: 'Complete Family Planner',
    client: 'Sheryl Budget',
    description: 'Full family budget with spouse allowances, market expenses, and dedicated savings "piggies".',
    categories: ['LPG', 'Hubby Allowance', 'Market', 'Groceries', 'Eat-out/Snacks', 'Transportation', 'Medicine', 'Shopping', 'Piggies/Savings'],
    color: 'bg-sky-100',
    borderColor: 'border-sky-300',
  },
  {
    id: 6,
    title: 'Essential Monthly Budget',
    client: 'Dhez Budget',
    description: 'Streamlined household budget focusing on everyday essentials and smart savings habits.',
    categories: ['Mineral Water', 'Insurance', 'Electric Bill', 'Water Bill', 'Mortgage', 'Credit Card', 'Palengke', 'Miscellaneous', 'Gold Installment', 'Emergency Fund'],
    color: 'bg-violet-100',
    borderColor: 'border-violet-300',
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

export function Portfolio() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)

  return (
    <section id="portfolio" className="py-20 md:py-28 gingham-pattern relative overflow-hidden" style={{ backgroundColor: 'rgba(255, 245, 245, 1)' }}>
      {/* Full-width frosted glass overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-sm pointer-events-none" />

      {/* Decorative bows */}
      <div className="absolute top-20 right-10 opacity-10">
        <DecorativeBow className="w-24 h-24 text-primary" />
      </div>
      <div className="absolute bottom-20 left-10 opacity-10 scale-x-[-1]">
        <DecorativeBow className="w-20 h-20 text-primary" />
      </div>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
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
            <p className="text-primary font-medium">Sample Budget Plans</p>
            <DecorativeBow className="w-8 h-8 text-primary opacity-50 scale-x-[-1]" />
          </div>
          <h2 className="text-3xl md:text-4xl font-noto-sans text-foreground mb-4 text-balance">
            Custom Budget Templates
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Every family is unique, and so are their budgets. Here are some examples of 
            personalized budget templates created for real families.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template, index) => (
            <motion.div 
              key={template.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`rounded-2xl border-2 ${template.borderColor} ${template.color} p-6 transition-all duration-300 hover:shadow-lg cursor-pointer`}
              onMouseEnter={() => setHoveredId(template.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="mb-4">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {template.client}
                </span>
                <h3 className="font-semibold text-foreground text-lg mt-1">{template.title}</h3>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                {template.description}
              </p>

              <div className="space-y-2">
                <p className="text-xs font-medium text-foreground uppercase tracking-wider">Categories included:</p>
                <motion.div 
                  layout
                  className="flex flex-wrap gap-1.5"
                >
                  {template.categories.slice(0, hoveredId === template.id ? template.categories.length : 5).map((category, catIndex) => (
                    <motion.span 
                      key={category}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2, delay: catIndex * 0.03 }}
                      className="inline-flex items-center gap-1 text-xs bg-card/80 text-foreground px-2 py-1 rounded-full"
                    >
                      <Check className="h-3 w-3 text-primary" />
                      {category}
                    </motion.span>
                  ))}
                  {hoveredId !== template.id && template.categories.length > 5 && (
                    <span className="text-xs text-muted-foreground px-2 py-1">
                      +{template.categories.length - 5} more
                    </span>
                  )}
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
