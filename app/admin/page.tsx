'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { AdminDashboard } from '@/components/admin-dashboard'
import { AdminLogin } from '@/components/admin-login'

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated
    const auth = localStorage.getItem('admin_authenticated')
    if (auth === 'true') {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    )
  }

  return isAuthenticated ? (
    <AdminDashboard onLogout={() => {
      localStorage.removeItem('admin_authenticated')
      setIsAuthenticated(false)
    }} />
  ) : (
    <AdminLogin onAuthenticate={() => {
      localStorage.setItem('admin_authenticated', 'true')
      setIsAuthenticated(true)
    }} />
  )
}
