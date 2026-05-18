# Brittany Signature Custom Font Setup

## Overview
This guide documents the setup of the "Brittany Signature" custom font for your Next.js + Builder.io project.

## File Structure
```
/public/fonts/
  └── BrittanySignature.woff2    # Custom font file (must be added)
app/globals.css                   # Contains @font-face definition
app/layout.tsx                    # Font variable registration
lib/fonts.ts                       # Font configuration exports
builder.config.ts                 # Builder.io font integration
```

## Setup Steps

### 1. Add Font File
- Place your `BrittanySignature.woff2` file in `/public/fonts/`
- Ensure the filename matches the @font-face `src` declaration in `app/globals.css`
- Only .woff2 format is required (modern browser support)

### 2. CSS Configuration (app/globals.css)
The @font-face declaration has been added:
```css
@font-face {
  font-family: 'Brittany Signature';
  src: url('/fonts/BrittanySignature.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

**Added to Tailwind theme:**
```css
--font-signature: 'Brittany Signature', 'Allura', cursive;
```

**CSS utility class added:**
```css
.font-signature {
  font-family: var(--font-signature);
}
```

### 3. Using the Font in Components

#### Method 1: Tailwind CSS Class
```tsx
<span className="font-signature">Your text here</span>
```

#### Method 2: Inline Styles
```tsx
<span style={{ fontFamily: 'Brittany Signature, cursive' }}>Your text here</span>
```

#### Method 3: Using Font Utility
```tsx
import { getFontFamily } from '@/lib/fonts';

<span style={{ fontFamily: getFontFamily('signature') }}>Your text here</span>
```

### 4. Builder.io Integration
The font is automatically available in the Builder visual editor through:
- `builder.config.ts` configuration file with custom font definitions
- Font appears in typography/font-family dropdown options
- Both preview and published pages support the font

## Typography Configuration

### Available Fonts in Builder.io
- Geist (default sans-serif)
- Playfair Display (serif)
- Noto Sans Adlam (display)
- Noto Sans (sans-serif)
- DM Sans (sans-serif)
- Allura (script/cursive)
- **Brittany Signature** (custom signature font)

### Font Classes
Each font has a corresponding Tailwind utility class:
- `font-sans` → Geist
- `font-serif` → Playfair Display
- `font-noto-adlam` → Noto Sans Adlam
- `font-noto-sans` → Noto Sans
- `font-dm-sans` → DM Sans
- `font-handwrite` → Allura
- `font-signature` → Brittany Signature

## How It Works

### Font Loading
1. **On Page Load:** Browser downloads `BrittanySignature.woff2` from `/public/fonts/`
2. **Font Display:** Using `font-display: swap` ensures text is visible immediately while font loads
3. **Fallback:** If font fails to load, falls back to 'Allura', then 'cursive'

### Builder.io Editor
1. **Selection:** Editor shows "Brittany Signature" in font dropdown
2. **Preview:** Font renders correctly in visual editor
3. **Publishing:** Published pages use the same @font-face definition

### Production Deployment
- Font file is served from `/public/fonts/` directory
- Works with all hosting platforms (Vercel, Netlify, etc.)
- CSS is inlined in globals.css so no additional requests needed for @font-face

## Verification

### Check if Font Loaded
Open browser DevTools → Application → Fonts:
- Should see "Brittany Signature" listed
- Status should show as "loaded"

### Check CSS
```css
/* In DevTools, verify this exists */
@font-face {
  font-family: 'Brittany Signature';
  src: url('/fonts/BrittanySignature.woff2') format('woff2');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

### Check Computed Styles
Select any element with `font-signature`:
- Computed font-family should show: `"Brittany Signature", Allura, cursive`

## Troubleshooting

### Font Not Loading
1. **Check file exists:** Verify `/public/fonts/BrittanySignature.woff2` exists
2. **Check filename:** Must match URL in `src: url('/fonts/BrittanySignature.woff2')`
3. **Check format:** Must be WOFF2 format (`.woff2` extension)
4. **Build cache:** Run `npm run build && npm run start` to verify

### Font Not in Builder Editor
1. Verify `builder.config.ts` is in project root
2. Check `process.env.NEXT_PUBLIC_BUILDER_API_KEY` is set
3. Hard refresh Builder editor (Cmd+Shift+R or Ctrl+Shift+R)

### Wrong Font Rendering
1. Verify CSS variable: `--font-signature: 'Brittany Signature', 'Allura', cursive;`
2. Check that @font-face font-family name matches: `'Brittany Signature'`
3. Ensure no conflicting CSS rules override the font

## File Dependencies

- `app/globals.css` - Must include @font-face and font-signature class
- `app/layout.tsx` - Already configured (no changes needed for local fonts)
- `lib/fonts.ts` - Optional utility exports (use for type-safe font references)
- `builder.config.ts` - Optional (for Builder.io dropdown integration)
- `/public/fonts/BrittanySignature.woff2` - **Required** (actual font file)

## Performance Notes

- WOFF2 is 25-30% smaller than WOFF
- `font-display: swap` prevents font loading from blocking text rendering
- Font is served as static asset (cached by browsers)
- Total impact: < 50KB (typical signature font size)

## Next Steps

1. ✅ CSS & Tailwind configuration complete
2. ⏳ Add `BrittanySignature.woff2` file to `/public/fonts/`
3. ⏳ Test in dev server: `npm run dev`
4. ⏳ Test in Builder editor visual preview
5. ⏳ Test on production build: `npm run build && npm start`
