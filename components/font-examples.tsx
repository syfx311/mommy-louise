'use client'

import { getFontFamily, getFontClass } from '@/lib/fonts'

/**
 * Example component demonstrating different ways to apply the Brittany Signature font
 */
export function FontExamples() {
  return (
    <div className="space-y-8 p-8">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          Method 1: Using Tailwind Class
        </h2>
        <p className="font-signature text-3xl text-primary">
          Brittany Signature with Tailwind
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          Method 2: Using Inline Style
        </h2>
        <p style={{ fontFamily: 'Brittany Signature, cursive' }} className="text-3xl text-primary">
          Brittany Signature with Inline Style
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          Method 3: Using Font Utility Function
        </h2>
        <p style={{ fontFamily: getFontFamily('signature') }} className="text-3xl text-primary">
          Brittany Signature with Utility Function
        </p>
      </div>

      <div>
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          Method 4: Using Font Class Utility Function
        </h2>
        <p className={`${getFontClass('signature')} text-3xl text-primary`}>
          Brittany Signature with Class Function
        </p>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          Size Variations
        </h2>
        <div className="space-y-2">
          <p className="font-signature text-xl text-primary">Text XL</p>
          <p className="font-signature text-2xl text-primary">Text 2XL</p>
          <p className="font-signature text-3xl text-primary">Text 3XL</p>
          <p className="font-signature text-4xl text-primary">Text 4XL</p>
          <p className="font-signature text-5xl text-primary">Text 5XL</p>
        </div>
      </div>

      <div className="border-t pt-8">
        <h2 className="text-sm font-medium text-muted-foreground mb-4">
          Color Variations
        </h2>
        <div className="space-y-2">
          <p className="font-signature text-2xl text-primary">Primary Color</p>
          <p className="font-signature text-2xl text-foreground">Foreground Color</p>
          <p className="font-signature text-2xl text-muted-foreground">Muted Foreground</p>
          <p className="font-signature text-2xl text-accent">Accent Color</p>
        </div>
      </div>
    </div>
  )
}
