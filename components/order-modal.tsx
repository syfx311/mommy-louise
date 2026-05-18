'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface OrderModalProps {
  isOpen: boolean
  onClose: () => void
  packageName: string
}

export function OrderModal({ isOpen, onClose, packageName }: OrderModalProps) {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    binderType: '',
    colors: '' as string | string[],
    inserts: [] as string[],
    challenges: '',
    specialRequests: ''
  })

  const binderOptions = {
    'Premium Package': ['A6 Premium Tri-fold', 'A7 Premium Tri-fold'],
    'Sophie Package': ['Soft Leather A6'],
    'Elegance Package': ['Looseleaf A6'],
    'Mystic Package': ['Transparent A7']
  }

  const insertOptions = [
    'Budget Tracker',
    'Savings Goals',
    'Monthly Overview',
    'Weekly Planner',
    'Expense Tracker',
    'Debt Payoff'
  ]

  const challengeOptions = ['12-Month Challenge', 'Weekly Challenge', 'Theme-Based Challenge']

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: Array.isArray(prev[field as keyof typeof formData])
        ? (prev[field as keyof typeof formData] as string[]).includes(value)
          ? (prev[field as keyof typeof formData] as string[]).filter(i => i !== value)
          : [...(prev[field as keyof typeof formData] as string[]), value]
        : [value]
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
      return
    }

    setIsSubmitting(true)
    setSubmitError(null)
    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          packageName,
          ...formData
        })
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit order')
      }

      setSubmitSuccess(true)
      setTimeout(() => {
        onClose()
        setStep(1)
        setSubmitSuccess(false)
        setSubmitError(null)
        setFormData({
          customerName: '',
          customerEmail: '',
          customerPhone: '',
          binderType: '',
          colors: '',
          inserts: [],
          challenges: '',
          specialRequests: ''
        })
      }, 2000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to submit order. Please try again.'
      console.error('Order submission error:', error)
      setSubmitError(errorMessage)
    } finally {
      setIsSubmitting(false)
    }
  }

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
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={e => e.stopPropagation()}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary/10 to-rose-100/10 border-b border-primary/20 px-6 md:px-8 py-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-foreground">
                Order {packageName}
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 md:px-8 py-8">
              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-lg flex items-start gap-3"
                >
                  <div className="text-red-600 font-semibold">⚠</div>
                  <div>
                    <p className="text-sm font-semibold text-red-900">Error</p>
                    <p className="text-sm text-red-800 mt-1">{submitError}</p>
                  </div>
                </motion.div>
              )}
              <AnimatePresence mode="wait">
                {submitSuccess ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: 'spring' }}
                    >
                      <CheckCircle className="w-16 h-16 text-primary mx-auto mb-4" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Order Submitted!
                    </h3>
                    <p className="text-muted-foreground">
                      We'll review your order and contact you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key={`step-${step}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleSubmit}
                    className="space-y-6"
                  >
                    {/* Step Indicator */}
                    <div className="flex gap-2 mb-8">
                      {[1, 2, 3].map(s => (
                        <motion.div
                          key={s}
                          className={`h-2 flex-1 rounded-full transition-colors ${
                            s <= step ? 'bg-primary' : 'bg-primary/20'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Step 1: Customer Info */}
                    {step === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Your Information
                        </h3>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Full Name *
                          </label>
                          <Input
                            type="text"
                            name="customerName"
                            value={formData.customerName}
                            onChange={handleInputChange}
                            placeholder="Maria Santos"
                            required
                            className="bg-card border-primary/20 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="customerEmail"
                            value={formData.customerEmail}
                            onChange={handleInputChange}
                            placeholder="maria@example.com"
                            required
                            className="bg-card border-primary/20 rounded-xl"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Phone Number
                          </label>
                          <Input
                            type="tel"
                            name="customerPhone"
                            value={formData.customerPhone}
                            onChange={handleInputChange}
                            placeholder="+63 9XX XXX XXXX"
                            className="bg-card border-primary/20 rounded-xl"
                          />
                        </div>
                      </div>
                    )}

                    {/* Step 2: Customization */}
                    {step === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Customize Your Package
                        </h3>

                        {/* Binder Type */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Binder Type
                          </label>
                          <div className="space-y-2">
                            {(binderOptions[packageName as keyof typeof binderOptions] || []).map(option => (
                              <label key={option} className="flex items-center gap-3 p-3 border-2 border-primary/20 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors">
                                <input
                                  type="radio"
                                  name="binderType"
                                  value={option}
                                  checked={formData.binderType === option}
                                  onChange={handleInputChange}
                                  className="w-4 h-4"
                                />
                                <span className="text-foreground">{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Colors */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Preferred Colors
                          </label>
                          <Input
                            type="text"
                            name="colors"
                            value={formData.colors as string}
                            onChange={handleInputChange}
                            placeholder="e.g., Blush Pink, Soft Rose, Gold accents"
                            className="bg-card border-primary/20 rounded-xl"
                          />
                        </div>

                        {/* Inserts */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Select Inserts
                          </label>
                          <div className="space-y-2">
                            {insertOptions.map(insert => (
                              <label key={insert} className="flex items-center gap-3 p-3 border-2 border-primary/20 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={(formData.inserts as string[]).includes(insert)}
                                  onChange={() => handleCheckboxChange('inserts', insert)}
                                  className="w-4 h-4"
                                />
                                <span className="text-foreground">{insert}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Challenges & Notes */}
                    {step === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                          Final Details
                        </h3>

                        {/* Challenges */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-3">
                            Choose a Challenge Type
                          </label>
                          <div className="space-y-2">
                            {challengeOptions.map(challenge => (
                              <label key={challenge} className="flex items-center gap-3 p-3 border-2 border-primary/20 rounded-xl cursor-pointer hover:bg-primary/5 transition-colors">
                                <input
                                  type="radio"
                                  name="challenges"
                                  value={challenge}
                                  checked={formData.challenges === challenge}
                                  onChange={handleInputChange}
                                  className="w-4 h-4"
                                />
                                <span className="text-foreground">{challenge}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Special Requests */}
                        <div>
                          <label className="block text-sm font-medium text-foreground mb-2">
                            Special Requests
                          </label>
                          <textarea
                            name="specialRequests"
                            value={formData.specialRequests}
                            onChange={handleInputChange}
                            placeholder="Any specific themes, additional items, or special notes?"
                            rows={4}
                            className="w-full rounded-xl border-2 border-primary/20 bg-card px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                          />
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-6 border-t border-primary/20">
                      {step > 1 && (
                        <Button
                          type="button"
                          onClick={() => setStep(step - 1)}
                          variant="outline"
                          className="flex-1"
                        >
                          Back
                        </Button>
                      )}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-primary to-rose-500 hover:from-primary/90 hover:to-rose-600 text-primary-foreground rounded-full font-semibold"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Submitting...
                          </span>
                        ) : step === 3 ? (
                          'Submit Order'
                        ) : (
                          'Continue'
                        )}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
