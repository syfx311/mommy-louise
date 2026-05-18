# Using Brittany Signature Font in Builder.io

## ✅ Font is Now Available

Your **Brittany Signature** font is now registered in the system and available for all future designs.

## How to Use in Builder.io Visual Editor

### Step 1: Select Text Element
- Click on any text element in your Builder design
- Or create a new text element

### Step 2: Open Typography Settings
- Look for the **Typography** or **Text** panel on the right
- Click on the font dropdown

### Step 3: Select Brittany Signature
- Find **"Brittany Signature"** in the font list
- Click to apply it to the selected text
- See the preview update in real-time

### Step 4: Adjust as Needed
- Resize with size controls
- Change color if desired
- Adjust line height, letter spacing, etc.

## Visual Steps

```
Text Element → Right Panel → Typography → Font Dropdown → "Brittany Signature"
```

## What's Been Set Up

✅ **Font File:** `/public/fonts/BrittanySignature.otf` (89KB)

✅ **CSS Registration:** `app/globals.css`
```css
@font-face {
  font-family: 'Brittany Signature';
  src: url('/fonts/BrittanySignature.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}
```

✅ **Builder.io Config:** `builder.config.ts`
- Font registered as custom font
- Appears in font dropdown
- CSS included for preview rendering
- Available for all designs

✅ **CSS Utilities:** 
- Class: `font-signature`
- Variable: `--font-signature`

## Available Fonts in Builder.io

When editing text, you can now choose from:

1. **Brittany Signature** ✨ (custom - your signature font)
2. Geist (sans-serif)
3. Playfair Display (serif)
4. Noto Sans Adlam (display)
5. Noto Sans (sans-serif)
6. DM Sans (sans-serif)
7. Allura (handwriting style)

## Styling Options with Brittany Signature

Once you select the font:

### Text Sizes
- Small, Medium, Large, XL, 2XL, 3XL, etc.
- All responsive - adjust per breakpoint

### Colors
- Any color from your design system
- Primary, Secondary, Accent, Custom colors

### Effects
- Line height adjustment
- Letter spacing
- Text alignment (left, center, right)
- Font weight (if supported)

## Example Usage

**Hero Title:**
```
Text: "Your Main Heading"
Font: Brittany Signature
Size: 3XL or 4XL
Color: Primary (pink)
Align: Center
```

**Tagline:**
```
Text: "Elegant subtitle"
Font: Brittany Signature
Size: 2XL
Color: Primary
Align: Center
```

## Tips for Best Results

1. **Size:** Works best at larger sizes (2XL+)
2. **Color:** Looks great in primary color (pink)
3. **Spacing:** Increase line height for readability
4. **Contrast:** Ensure enough contrast with background
5. **Hierarchy:** Use for headings and special text

## Troubleshooting

### Font Not Showing in Dropdown?
1. Hard refresh Builder editor (Cmd+Shift+R or Ctrl+Shift+R)
2. Clear browser cache
3. Try in a different browser
4. Close and reopen Builder

### Font Not Rendering in Preview?
1. Check that text element is visible
2. Verify font size is not too small (use 2XL+)
3. Ensure text color has good contrast
4. Try a different background color

### Wrong Font Displaying?
1. Verify you selected "Brittany Signature" from dropdown
2. Check that it was applied to the correct element
3. Look for conflicting CSS styles
4. Refresh the page

## Browser Support

The font works in all modern browsers:
- Chrome/Edge ✅
- Firefox ✅
- Safari ✅
- Mobile browsers ✅

## Performance

- Font file: 89KB (cached after first load)
- Load time: Non-blocking (text visible while loading)
- Impact: Minimal, only loaded when font is used

## Permanent Setup

The font is now permanently available because:

1. ✅ Font file stored in `/public/fonts/`
2. ✅ CSS @font-face in `app/globals.css` (global)
3. ✅ Builder.io config in `builder.config.ts` (persists)
4. ✅ Utilities in `lib/fonts.ts` (for programmatic use)

This means:
- All current pages can use it
- All future pages can select it in Builder
- All team members can access it
- It's available in preview and production

## Need More Help?

For additional configuration or customization:
- Check `builder.config.ts` for all available options
- See `lib/fonts.ts` for programmatic font usage
- Review `components/font-examples.tsx` for code examples
