'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, Package, MapPin, AlertCircle, Save } from 'lucide-react'
import { supabase } from '@/lib/supabase'

interface Order {
  id: string
  order_number: string
  package_name: string
  customer_name: string
  customer_email: string
  customer_phone: string | null
  binder_type: string | null
  colors: string | null
  inserts: string | null
  challenges: string | null
  special_requests: string | null
  order_status: string
  payment_status: string
  total_price: number | null
  notes: string | null
  admin_notes: string | null
  created_at: string
  updated_at: string
}

interface OrderDetailModalProps {
  isOpen: boolean
  onClose: () => void
  order: Order
  onOrderUpdated?: () => void
}

export function OrderDetailModal({ isOpen, onClose, order, onOrderUpdated }: OrderDetailModalProps) {
  const [adminNotes, setAdminNotes] = useState(order.admin_notes || '')
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')

  const handleSaveNotes = async () => {
    setIsSaving(true)
    setSaveMessage('')

    try {
      if (!supabase) throw new Error('Database connection failed')

      const { error } = await supabase
        .from('orders')
        .update({
          admin_notes: adminNotes,
          updated_at: new Date().toISOString(),
        })
        .eq('id', order.id)

      if (error) throw error

      setSaveMessage('Notes saved successfully')
      setTimeout(() => setSaveMessage(''), 2000)

      if (onOrderUpdated) {
        onOrderUpdated()
      }
    } catch (error) {
      console.error('Error saving notes:', error)
      setSaveMessage('Failed to save notes')
    } finally {
      setIsSaving(false)
    }
  }

  const getStatusBadgeColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      shipped: 'bg-green-100 text-green-800',
      delivered: 'bg-emerald-100 text-emerald-800',
      cancelled: 'bg-red-100 text-red-800',
      unpaid: 'bg-orange-100 text-orange-800',
      paid: 'bg-green-100 text-green-800',
      refunded: 'bg-gray-100 text-gray-800',
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
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
            className="bg-card rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-primary/20"
          >
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-primary/10 to-rose-100/10 border-b border-primary/20 px-8 py-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-foreground">{order.order_number}</h2>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString()} at {new Date(order.created_at).toLocaleTimeString()}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-primary/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-foreground" />
              </button>
            </div>

            {/* Content */}
            <div className="px-8 py-6 space-y-6">
              {/* Status Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Order Status</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeColor(order.order_status)}`}>
                    {order.order_status.charAt(0).toUpperCase() + order.order_status.slice(1)}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Payment Status</p>
                  <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getStatusBadgeColor(order.payment_status)}`}>
                    {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Customer Information */}
              <div className="space-y-3 border-t border-primary/20 pt-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Customer Information
                </h3>

                <div className="space-y-2 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs mb-1">Name</p>
                    <p className="text-foreground font-medium">{order.customer_name}</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="w-4 h-4 text-primary mt-1" />
                    <a href={`mailto:${order.customer_email}`} className="text-primary hover:underline">
                      {order.customer_email}
                    </a>
                  </div>

                  {order.customer_phone && (
                    <div className="flex items-start gap-2">
                      <Phone className="w-4 h-4 text-primary mt-1" />
                      <a href={`tel:${order.customer_phone}`} className="text-primary hover:underline">
                        {order.customer_phone}
                      </a>
                    </div>
                  )}
                </div>
              </div>

              {/* Order Details */}
              <div className="space-y-3 border-t border-primary/20 pt-6">
                <h3 className="font-semibold text-foreground flex items-center gap-2">
                  <Package className="w-5 h-5 text-primary" />
                  Order Details
                </h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Package:</span>
                    <span className="font-medium text-foreground">{order.package_name}</span>
                  </div>

                  {order.binder_type && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Binder Type:</span>
                      <span className="font-medium text-foreground">{order.binder_type}</span>
                    </div>
                  )}

                  {order.colors && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Colors:</span>
                      <span className="font-medium text-foreground">{order.colors}</span>
                    </div>
                  )}

                  {order.inserts && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Inserts:</span>
                      <span className="font-medium text-foreground">{order.inserts}</span>
                    </div>
                  )}

                  {order.total_price && (
                    <div className="flex justify-between pt-2 border-t border-primary/20">
                      <span className="text-muted-foreground font-semibold">Total Price:</span>
                      <span className="font-bold text-primary">₱{order.total_price.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Customer Requests */}
              {(order.challenges || order.special_requests) && (
                <div className="space-y-3 border-t border-primary/20 pt-6">
                  <h3 className="font-semibold text-foreground flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-primary" />
                    Customer Requests
                  </h3>

                  <div className="space-y-3 text-sm bg-primary/5 p-4 rounded-lg">
                    {order.challenges && (
                      <div>
                        <p className="text-muted-foreground mb-1 font-medium">Challenges:</p>
                        <p className="text-foreground">{order.challenges}</p>
                      </div>
                    )}

                    {order.special_requests && (
                      <div>
                        <p className="text-muted-foreground mb-1 font-medium">Special Requests:</p>
                        <p className="text-foreground">{order.special_requests}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Admin Notes */}
              <div className="space-y-3 border-t border-primary/20 pt-6">
                <h3 className="font-semibold text-foreground">Admin Notes</h3>

                <textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add internal notes about this order (not visible to customer)..."
                  className="w-full h-24 p-3 bg-background border-2 border-primary/20 rounded-lg text-foreground placeholder-muted-foreground focus:border-primary focus:outline-none resize-none"
                />

                {saveMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`text-sm ${saveMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}
                  >
                    {saveMessage}
                  </motion.p>
                )}

                <button
                  onClick={handleSaveNotes}
                  disabled={isSaving}
                  className="w-full px-4 py-2 bg-primary hover:bg-primary/90 disabled:bg-primary/50 text-primary-foreground rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  {isSaving ? 'Saving...' : 'Save Notes'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
