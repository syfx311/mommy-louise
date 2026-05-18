-- Fix RLS policies to allow anonymous (unauthenticated) users to submit orders and contact forms
-- This allows the public website to accept orders and inquiries

-- First, create contact_queries table if it doesn't exist
CREATE TABLE IF NOT EXISTS contact_queries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) NOT NULL DEFAULT 'new',
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on contact_queries
ALTER TABLE contact_queries ENABLE ROW LEVEL SECURITY;

-- Drop existing RLS policies that require authentication
DROP POLICY IF EXISTS "Orders are readable by authenticated users" ON orders;
DROP POLICY IF EXISTS "Orders are writable by authenticated users" ON orders;
DROP POLICY IF EXISTS "Orders are updatable by authenticated users" ON orders;
DROP POLICY IF EXISTS "Customers are readable by authenticated users" ON customers;
DROP POLICY IF EXISTS "Customers are writable by authenticated users" ON customers;
DROP POLICY IF EXISTS "Order items are readable by authenticated users" ON order_items;
DROP POLICY IF EXISTS "Order items are writable by authenticated users" ON order_items;
DROP POLICY IF EXISTS "Payments are readable by authenticated users" ON payments;
DROP POLICY IF EXISTS "Email logs are readable by authenticated users" ON email_logs;
DROP POLICY IF EXISTS "Email logs are writable by authenticated users" ON email_logs;

-- Create new RLS policies that allow anonymous (public) access for inserts
-- This enables the website to accept orders and contact inquiries from unauthenticated users

-- Customers table policies
CREATE POLICY "Customers are insertable by anyone" ON customers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Customers are readable by authenticated users" ON customers
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Customers are updatable by authenticated users" ON customers
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Orders table policies
CREATE POLICY "Orders are insertable by anyone" ON orders
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Orders are readable by authenticated users" ON orders
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Orders are updatable by authenticated users" ON orders
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Order items table policies
CREATE POLICY "Order items are insertable by anyone" ON order_items
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Order items are readable by authenticated users" ON order_items
  FOR SELECT USING (auth.role() = 'authenticated');

-- Payments table policies
CREATE POLICY "Payments are insertable by anyone" ON payments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Payments are readable by authenticated users" ON payments
  FOR SELECT USING (auth.role() = 'authenticated');

-- Email logs table policies
CREATE POLICY "Email logs are insertable by anyone" ON email_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Email logs are readable by authenticated users" ON email_logs
  FOR SELECT USING (auth.role() = 'authenticated');

-- Contact queries table policies
CREATE POLICY "Contact queries are insertable by anyone" ON contact_queries
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Contact queries are readable by authenticated users" ON contact_queries
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Contact queries are updatable by authenticated users" ON contact_queries
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE INDEX IF NOT EXISTS idx_contact_queries_email ON contact_queries(email);
CREATE INDEX IF NOT EXISTS idx_contact_queries_status ON contact_queries(status);
CREATE INDEX IF NOT EXISTS idx_contact_queries_created_at ON contact_queries(created_at DESC);
