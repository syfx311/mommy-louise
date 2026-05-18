'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface AdminLoginProps {
  onAuthenticate: () => void
}

export function AdminLogin({ onAuthenticate }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Use environment variable or default password
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'admin123'

    if (password === adminPassword) {
      onAuthenticate()
    } else {
      setError('Invalid password')
    }

    setIsLoading(false)
    setPassword('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-rose-100/10 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-card rounded-3xl shadow-2xl p-8 max-w-md w-full border border-primary/20"
      >
        <div className="flex justify-center mb-6">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="p-4 bg-gradient-to-br from-primary/10 to-rose-100/10 rounded-2xl"
          >
            <Lock className="w-8 h-8 text-primary" />
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold text-center text-foreground mb-2">
          Admin Panel
        </h1>
        <p className="text-center text-muted-foreground mb-8">
          Manage your orders
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground mb-2">
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              disabled={isLoading}
              className="bg-background border-primary/20 rounded-xl"
              autoFocus
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 bg-destructive/10 border border-destructive/30 rounded-lg"
            >
              <AlertCircle className="w-4 h-4 text-destructive" />
              <p className="text-sm text-destructive">{error}</p>
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={isLoading || !password}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-full py-3 font-semibold"
          >
            {isLoading ? 'Checking...' : 'Access Dashboard'}
          </Button>
        </form>

        <p className="text-xs text-muted-foreground text-center mt-6">
          For security, change the default password in your environment variables
        </p>
      </motion.div>
    </div>
  )
}
