# Brittany Signature Font - Quick Start

## What's Been Set Up

✅ CSS registration  
✅ Tailwind configuration  
✅ Font utilities  
✅ Builder.io integration  
✅ Documentation & examples  

## One Step Remaining

⏳ **Add font file:** Place `BrittanySignature.woff2` in `/public/fonts/`

## How to Use (3 Ways)

### 1️⃣ Tailwind Class (Recommended)
```tsx
<span className="font-signature text-3xl">Cash Stuffing</span>
```

### 2️⃣ Inline Style
```tsx
<span style={{ fontFamily: 'Brittany Signature, cursive' }}>Cash Stuffing</span>
```

### 3️⃣ Using Utilities
```tsx
import { getFontFamily } from '@/lib/fonts';

<span style={{ fontFamily: getFontFamily('signature') }}>Cash Stuffing</span>
```

## In Builder Editor

1. Select text element
2. Click font dropdown
3. Choose "Brittany Signature"
4. Done! 🎉

## Test It

```bash
# 1. Add font file first
cp /path/to/BrittanySignature.woff2 public/fonts/

# 2. Run dev server
npm run dev

# 3. Check if font loaded
# Open http://localhost:3000
# DevTools → Application → Fonts
# Should see "Brittany Signature" as "loaded"
```

## All Available Fonts

| Font | Class | Usage |
|------|-------|-------|
| **Brittany Signature** | `font-signature` | ✨ Elegant signatures |
| Allura | `font-handwrite` | 🖊️ Handwriting |
| Playfair Display | `font-serif` | 📖 Serif display |
| Noto Sans Adlam | `font-noto-adlam` | 🌍 Display |
| Geist | `font-sans` | 📝 Default body |
| Noto Sans | `font-noto-sans` | 🌍 International |
| DM Sans | `font-dm-sans` | 🔤 Geometric |

## File Structure

```
/public/fonts/
  └── BrittanySignature.woff2    ← ADD THIS

app/globals.css                   ← ✅ Configured
app/layout.tsx                    ← ✅ Ready
lib/fonts.ts                      ← ✅ Utilities
lib/typography.ts                ← ✅ Presets
builder.config.ts                ← ✅ Editor config
components/font-examples.tsx     ← ✅ Examples
```

## Common Patterns

### Hero Title with Signature Font
```tsx
<h1 className="text-4xl md:text-5xl lg:text-6xl font-signature text-primary">
  Take Control with Cash Stuffing
</h1>
```

### With Size & Color
```tsx
<h2 className="font-signature text-3xl text-primary font-bold">
  Your Heading
</h2>
```

### Responsive Sizing
```tsx
<p className="text-2xl md:text-3xl lg:text-4xl font-signature">
  Scales on all devices
</p>
```

### With Other Styles
```tsx
<span className="font-signature text-2xl leading-tight text-center">
  Your text here
</span>
```

## Using Utilities

### Typography Helper
```tsx
import { buildTypographyClass, getPreset } from '@/lib/typography';

// Using preset
<h1 className={getPreset('heroTitle').className}>Title</h1>

// Using builder
<h2 className={buildTypographyClass({
  font: 'signature',
  size: '3xl',
  color: 'primary',
  weight: 'bold'
})}>
  My Heading
</h2>
```

### Font Utilities
```tsx
import { getFontFamily, getFontClass } from '@/lib/fonts';

// Get the font family string
const family = getFontFamily('signature');
// Returns: 'Brittany Signature, Allura, cursive'

// Get the Tailwind class
const className = getFontClass('signature');
// Returns: 'font-signature'
```

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers
- ⚠️ IE11 (not supported, uses fallback)

## Performance

- Font file: ~30-50KB
- Load time: Non-blocking (text shows immediately)
- Caching: Browser cache (loaded once)
- Network: Only if not cached
- Impact: Minimal ✅

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Font not loading | Add file to `/public/fonts/BrittanySignature.woff2` |
| Font not in Builder | Hard refresh browser (Cmd+Shift+R) |
| Wrong font showing | Check CSS class name: `font-signature` |
| 404 error | Verify file path and filename match |

## Files to Review

1. **FONT_SETUP.md** - Complete setup guide
2. **IMPLEMENTATION_SUMMARY.md** - What was done
3. **SETUP_CHECKLIST.md** - Step-by-step checklist
4. **lib/fonts.ts** - Font utilities reference
5. **lib/typography.ts** - Typography presets
6. **components/font-examples.tsx** - Code examples

## Next Steps

1. ✅ Setup complete
2. ⏳ Add `BrittanySignature.woff2` to `/public/fonts/`
3. Test locally: `npm run dev`
4. Test in Builder: Open visual editor
5. Deploy to production

## Questions?

Check these files for more details:
- Implementation questions → `IMPLEMENTATION_SUMMARY.md`
- Setup issues → `FONT_SETUP.md`
- Step-by-step help → `SETUP_CHECKLIST.md`
- Code examples → `components/font-examples.tsx`

---

**Status:** ✅ Ready to use (after adding font file)
