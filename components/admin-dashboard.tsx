'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Download,
  LogOut,
  Eye,
  Trash2,
  X,
  Mail,
  CheckCircle,
  Clock,
  DollarSign,
  Truck,
  MoreVertical,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { OrderDetailModal } from '@/components/order-detail-modal'

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

interface AdminDashboardProps {
  onLogout: () => void
}

const ORDER_STATUSES = [
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'processing', label: 'Processing', color: 'bg-blue-100 text-blue-800' },
  { value: 'shipped', label: 'Shipped', color: 'bg-green-100 text-green-800' },
  { value: 'delivered', label: 'Delivered', color: 'bg-emerald-100 text-emerald-800' },
  { value: 'cancelled', label: 'Cancelled', color: 'bg-red-100 text-red-800' },
]

const PAYMENT_STATUSES = [
  { value: 'unpaid', label: 'Unpaid' },
  { value: 'paid', label: 'Paid' },
  { value: 'refunded', label: 'Refunded' },
]

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [filterPayment, setFilterPayment] = useState('')
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [actionInProgress, setActionInProgress] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'orders' | 'queries'>('orders')
  const [contactQueries, setContactQueries] = useState<any[]>([])
  const [queriesLoading, setQueriesLoading] = useState(false)

  useEffect(() => {
    fetchOrders()
    fetchContactQueries()
    const interval = setInterval(() => {
      fetchOrders()
      if (activeTab === 'queries') {
        fetchContactQueries()
      }
    }, 30000)
    return () => clearInterval(interval)
  }, [activeTab])

  useEffect(() => {
    filterOrders()
  }, [orders, searchTerm, filterStatus, filterPayment])

  const fetchOrders = async () => {
    try {
      if (!supabase) {
        setOrders([])
        setIsLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error('Error fetching orders:', error)
      setOrders([])
    } finally {
      setIsLoading(false)
    }
  }

  const fetchContactQueries = async () => {
    setQueriesLoading(true)
    try {
      if (!supabase) {
        setContactQueries([])
        return
      }

      const { data, error } = await supabase
        .from('contact_queries')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setContactQueries(data || [])
    } catch (error) {
      console.error('Error fetching contact queries:', error)
      setContactQueries([])
    } finally {
      setQueriesLoading(false)
    }
  }

  const filterOrders = () => {
    let filtered = orders

    if (searchTerm) {
      filtered = filtered.filter(
        order =>
          order.customer_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customer_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.order_number.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (filterStatus) {
      filtered = filtered.filter(order => order.order_status === filterStatus)
    }

    if (filterPayment) {
      filtered = filtered.filter(order => order.payment_status === filterPayment)
    }

    setFilteredOrders(filtered)
  }

  const handleUpdateOrderStatus = async (orderId: string, newStatus: string) => {
    setActionInProgress(orderId)
    try {
      if (!supabase) throw new Error('Database connection failed')

      const { error } = await supabase
        .from('orders')
        .update({ order_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)

      if (error) throw error
      await fetchOrders()
    } catch (error) {
      console.error('Error updating order:', error)
      alert('Failed to update order status')
    } finally {
      setActionInProgress(null)
    }
  }

  const handleUpdatePaymentStatus = async (orderId: string, newStatus: string) => {
    setActionInProgress(orderId)
    try {
      if (!supabase) throw new Error('Database connection failed')

      const { error } = await supabase
        .from('orders')
        .update({ payment_status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId)

      if (error) throw error
      await fetchOrders()
    } catch (error) {
      console.error('Error updating payment:', error)
      alert('Failed to update payment status')
    } finally {
      setActionInProgress(null)
    }
  }

  const handleResendEmail = async (orderId: string, emailType: 'customer_confirmation' | 'admin_notification') => {
    setActionInProgress(`${orderId}-${emailType}`)
    try {
      const response = await fetch(`/api/orders/${orderId}/resend-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emailType }),
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to resend email')
      }

      alert(`${emailType.replace(/_/g, ' ')} email sent successfully`)
    } catch (error) {
      console.error('Error resending email:', error)
      alert(`Failed to resend email: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setActionInProgress(null)
    }
  }

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm('Are you sure you want to delete this order? This cannot be undone.')) return

    setActionInProgress(orderId)
    try {
      if (!supabase) throw new Error('Database connection failed')

      const { error } = await supabase
        .from('orders')
        .delete()
        .eq('id', orderId)

      if (error) throw error
      setOrders(orders.filter(o => o.id !== orderId))
      alert('Order deleted successfully')
    } catch (error) {
      console.error('Error deleting order:', error)
      alert('Failed to delete order')
    } finally {
      setActionInProgress(null)
    }
  }

  const handleUpdateQueryStatus = async (queryId: string, newStatus: string) => {
    setActionInProgress(queryId)
    try {
      if (!supabase) throw new Error('Database connection failed')

      const { error } = await supabase
        .from('contact_queries')
        .update({ status: newStatus, updated_at: new Date().toISOString() })
        .eq('id', queryId)

      if (error) throw error
      await fetchContactQueries()
    } catch (error) {
      console.error('Error updating query status:', error)
      alert('Failed to update query status')
    } finally {
      setActionInProgress(null)
    }
  }

  const handleDeleteQuery = async (queryId: string) => {
    if (!confirm('Are you sure you want to delete this query?')) return

    setActionInProgress(queryId)
    try {
      if (!supabase) throw new Error('Database connection failed')

      const { error } = await supabase
        .from('contact_queries')
        .delete()
        .eq('id', queryId)

      if (error) throw error
      setContactQueries(contactQueries.filter(q => q.id !== queryId))
      alert('Query deleted successfully')
    } catch (error) {
      console.error('Error deleting query:', error)
      alert('Failed to delete query')
    } finally {
      setActionInProgress(null)
    }
  }

  const handleExportCSV = () => {
    const headers = ['Order Number', 'Date', 'Name', 'Email', 'Phone', 'Package', 'Binder Type', 'Order Status', 'Payment Status', 'Total Price']
    const rows = filteredOrders.map(order => [
      order.order_number,
      new Date(order.created_at).toLocaleDateString(),
      order.customer_name,
      order.customer_email,
      order.customer_phone || '',
      order.package_name,
      order.binder_type || '',
      order.order_status,
      order.payment_status,
      order.total_price || '0',
    ])

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')),
    ].join('\n')

    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `orders-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
  }

  const getStatusColor = (status: string) => {
    const statusObj = ORDER_STATUSES.find(s => s.value === status)
    return statusObj?.color || 'bg-gray-100 text-gray-800'
  }

  const pendingCount = orders.filter(o => o.order_status === 'pending').length
  const unpaidCount = orders.filter(o => o.payment_status === 'unpaid').length

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-40 bg-card border-b border-primary/20 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                {activeTab === 'orders'
                  ? `Manage ${orders.length} total orders`
                  : `Manage ${contactQueries.length} contact queries`
                }
              </p>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors font-medium"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mt-4 border-b border-primary/20">
            <button
              onClick={() => setActiveTab('orders')}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'orders'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => {
                setActiveTab('queries')
                if (contactQueries.length === 0) {
                  fetchContactQueries()
                }
              }}
              className={`px-4 py-3 font-medium transition-colors border-b-2 ${
                activeTab === 'queries'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Queries ({contactQueries.length})
            </button>
          </div>

          {/* Stats - Orders Tab */}
          {activeTab === 'orders' && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-background rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Pending Orders</p>
                  <p className="text-2xl font-bold text-foreground">{pendingCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Unpaid Orders</p>
                  <p className="text-2xl font-bold text-foreground">{unpaidCount}</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Total Orders</p>
                  <p className="text-2xl font-bold text-foreground">{orders.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-background rounded-lg p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="text-xs text-muted-foreground">Delivered</p>
                  <p className="text-2xl font-bold text-foreground">
                    {orders.filter(o => o.order_status === 'delivered').length}
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}
        </div>
      </motion.div>

      {/* Controls and Content */}
      {activeTab === 'orders' && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-6"
        >
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search by name, email, or order number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-card border-primary/20 rounded-full"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 rounded-full border-2 border-primary/20 bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">All Statuses</option>
              {ORDER_STATUSES.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>

            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-4 py-2 rounded-full border-2 border-primary/20 bg-card text-foreground focus:outline-none focus:border-primary transition-colors"
            >
              <option value="">All Payments</option>
              {PAYMENT_STATUSES.map(status => (
                <option key={status.value} value={status.value}>
                  {status.label}
                </option>
              ))}
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {(searchTerm || filterStatus || filterPayment) && (
              <button
                onClick={() => {
                  setSearchTerm('')
                  setFilterStatus('')
                  setFilterPayment('')
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors"
              >
                <X className="w-4 h-4" />
                Clear Filters
              </button>
            )}

            <Button
              onClick={handleExportCSV}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* Orders Table */}
        {isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              {orders.length === 0 ? 'No orders yet' : 'No orders match your filters'}
            </p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto rounded-2xl border border-primary/20 bg-card shadow-sm"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Order #</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Customer</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Package</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Order Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Payment</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredOrders.map((order, index) => (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-semibold text-primary">
                        {order.order_number}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {new Date(order.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-foreground">{order.customer_name}</p>
                          <p className="text-xs text-muted-foreground">{order.customer_email}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-foreground">{order.package_name}</td>
                      <td className="px-6 py-4">
                        <select
                          value={order.order_status}
                          onChange={(e) => handleUpdateOrderStatus(order.id, e.target.value)}
                          disabled={actionInProgress === order.id}
                          className={`px-3 py-1 rounded-full text-xs font-semibold border-0 cursor-pointer ${getStatusColor(order.order_status)} focus:outline-none`}
                        >
                          {ORDER_STATUSES.map(status => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <select
                          value={order.payment_status}
                          onChange={(e) => handleUpdatePaymentStatus(order.id, e.target.value)}
                          disabled={actionInProgress === order.id}
                          className="px-3 py-1 rounded-full text-xs font-semibold border-2 border-primary/20 bg-background cursor-pointer focus:outline-none"
                        >
                          {PAYMENT_STATUSES.map(status => (
                            <option key={status.value} value={status.value}>
                              {status.label}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => {
                              setSelectedOrder(order)
                              setIsDetailModalOpen(true)
                            }}
                            title="View details"
                            className="p-2 hover:bg-primary/20 rounded-lg text-primary transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <div className="relative group">
                            <button
                              title="More actions"
                              className="p-2 hover:bg-primary/20 rounded-lg text-primary transition-colors"
                            >
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 mt-1 w-48 bg-card border border-primary/20 rounded-lg shadow-lg hidden group-hover:block z-50">
                              <button
                                onClick={() => handleResendEmail(order.id, 'customer_confirmation')}
                                disabled={actionInProgress?.startsWith(order.id)}
                                className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm flex items-center gap-2 border-b border-primary/10"
                              >
                                <Mail className="w-4 h-4" />
                                Resend Customer Email
                              </button>
                              <button
                                onClick={() => handleResendEmail(order.id, 'admin_notification')}
                                disabled={actionInProgress?.startsWith(order.id)}
                                className="w-full text-left px-4 py-2 hover:bg-primary/10 text-sm flex items-center gap-2 border-b border-primary/10"
                              >
                                <Mail className="w-4 h-4" />
                                Resend Admin Email
                              </button>
                              <button
                                onClick={() => handleDeleteOrder(order.id)}
                                disabled={actionInProgress === order.id}
                                className="w-full text-left px-4 py-2 hover:bg-destructive/10 text-sm text-destructive flex items-center gap-2"
                              >
                                <Trash2 className="w-4 h-4" />
                                Delete Order
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}

        <p className="text-xs text-muted-foreground mt-4">
          Showing {filteredOrders.length} of {orders.length} orders
        </p>
      </div>
      )}

      {/* Queries Tab Content */}
      {activeTab === 'queries' && (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {queriesLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            Loading queries...
          </div>
        ) : contactQueries.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No contact queries yet</p>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-x-auto rounded-2xl border border-primary/20 bg-card shadow-sm"
          >
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-primary/20 bg-primary/5">
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Date</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Name</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Email</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Message</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Status</th>
                  <th className="px-6 py-4 text-left font-semibold text-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {contactQueries.map((query, index) => (
                    <motion.tr
                      key={query.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
                    >
                      <td className="px-6 py-4 text-muted-foreground text-sm">
                        {new Date(query.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 font-medium text-foreground">{query.name}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm">{query.email}</td>
                      <td className="px-6 py-4 text-muted-foreground text-sm max-w-xs truncate">{query.message}</td>
                      <td className="px-6 py-4">
                        <select
                          value={query.status}
                          onChange={(e) => handleUpdateQueryStatus(query.id, e.target.value)}
                          disabled={actionInProgress === query.id}
                          className="px-3 py-1 rounded-full text-xs font-semibold border-2 border-primary/20 bg-background cursor-pointer focus:outline-none"
                        >
                          <option value="new">New</option>
                          <option value="responded">Responded</option>
                          <option value="resolved">Resolved</option>
                        </select>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => handleDeleteQuery(query.id)}
                          disabled={actionInProgress === query.id}
                          title="Delete query"
                          className="p-2 hover:bg-destructive/20 rounded-lg text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </motion.div>
        )}
        <p className="text-xs text-muted-foreground mt-4">
          Showing {contactQueries.length} contact queries
        </p>
      </div>
      )}

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          order={selectedOrder}
          onOrderUpdated={fetchOrders}
        />
      )}
    </div>
  )
}
