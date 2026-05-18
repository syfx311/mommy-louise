-- Create orders table
CREATE TABLE public.orders (
  id BIGSERIAL PRIMARY KEY,
  package_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  binder_type TEXT,
  colors TEXT,
  inserts TEXT[],
  challenges TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on created_at for faster queries
CREATE INDEX orders_created_at_idx ON public.orders (created_at DESC);

-- Create index on customer_email for faster lookups
CREATE INDEX orders_customer_email_idx ON public.orders (customer_email);

-- Enable RLS (Row Level Security)
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Create policy to allow select for all (public read)
CREATE POLICY "Enable select for all" ON public.orders
  FOR SELECT
  USING (true);

-- Create policy to allow insert for all (public insert)
CREATE POLICY "Enable insert for all" ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow update for all (public update)
CREATE POLICY "Enable update for all" ON public.orders
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Create policy to allow delete for all (public delete)
CREATE POLICY "Enable delete for all" ON public.orders
  FOR DELETE
  USING (true);
