---
name: Heritage Tech
colors:
  surface: '#f8f9fa'
  surface-dim: '#d9dadb'
  surface-bright: '#f8f9fa'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f4f5'
  surface-container: '#edeeef'
  surface-container-high: '#e7e8e9'
  surface-container-highest: '#e1e3e4'
  on-surface: '#191c1d'
  on-surface-variant: '#43474e'
  inverse-surface: '#2e3132'
  inverse-on-surface: '#f0f1f2'
  outline: '#73777f'
  outline-variant: '#c3c6cf'
  surface-tint: '#426083'
  primary: '#002544'
  on-primary: '#ffffff'
  primary-container: '#1a3b5c'
  on-primary-container: '#87a5cc'
  inverse-primary: '#aac9f1'
  secondary: '#b7102a'
  on-secondary: '#ffffff'
  secondary-container: '#db313f'
  on-secondary-container: '#fffbff'
  tertiary: '#332000'
  on-tertiary: '#ffffff'
  tertiary-container: '#4f3400'
  on-tertiary-container: '#c49d60'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d1e4ff'
  primary-fixed-dim: '#aac9f1'
  on-primary-fixed: '#001d36'
  on-primary-fixed-variant: '#29496a'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b1'
  on-secondary-fixed: '#410007'
  on-secondary-fixed-variant: '#92001c'
  tertiary-fixed: '#ffddaf'
  tertiary-fixed-dim: '#ebc07f'
  on-tertiary-fixed: '#281800'
  on-tertiary-fixed-variant: '#5e410c'
  background: '#f8f9fa'
  on-background: '#191c1d'
  surface-variant: '#e1e3e4'
typography:
  display-lg:
    fontFamily: Vazirmatn
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 64px
  display-lg-mobile:
    fontFamily: Vazirmatn
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 44px
  headline-lg:
    fontFamily: Vazirmatn
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 48px
  headline-md:
    fontFamily: Vazirmatn
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 36px
  title-lg:
    fontFamily: Vazirmatn
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Vazirmatn
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Vazirmatn
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-lg:
    fontFamily: Vazirmatn
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
  label-sm:
    fontFamily: Vazirmatn
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base-unit: 4px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
  container-max-width: 1280px
---

## Brand & Style

This design system is engineered for high-performance enterprise and news applications catering to the Persian-speaking market. The personality is authoritative, reliable, and modern, blending a **Corporate / Modern** structure with **Minimalist** clarity. 

The aesthetic focuses on technical precision and cultural resonance. It utilizes a structured grid to provide a sense of stability, while subtle depth and refined typography ensure high information density remains legible and stress-free. The emotional response should be one of professional trust and seamless utility.

## Colors

The palette is anchored by **Deep Blue (#1A3B5C)**, providing a foundation of institutional strength and digital sophistication. **Red (#E63946)** is used sparingly as an accent for critical actions, notifications, and brand highlights to create immediate visual hierarchy.

Neutrals are biased toward cool greys to maintain the professional tone. Surfaces primarily use off-white or very light grey to reduce eye strain during long-form reading in Persian script. Dark mode implementations should preserve the primary blue as the key brand identifier while shifting the background to a deep charcoal.

## Typography

The typography is built exclusively on **Vazirmatn** to ensure seamless rendering of Persian and Arabic characters. Line heights are specifically increased (generally 1.5x to 1.7x the font size) to accommodate the tall ascenders and descenders characteristic of the Persian script, preventing visual crowding in dense text blocks.

Weight is used strategically to create hierarchy; headlines utilize "ExtraBold" and "Bold" weights to stand out against the Deep Blue background, while body text remains in "Regular" or "Medium" for maximum legibility. For numerical data, Vazirmatn's localized digits should be used to maintain linguistic consistency.

## Layout & Spacing

This design system employs a **Fluid Grid** with strict **RTL (Right-to-Left)** logic. All directional properties are logical (e.g., `padding-inline-start` instead of `padding-left`) to ensure the UI mirrors correctly for Persian users. 

The 12-column grid system is the standard for desktop, collapsing to a 4-column grid for mobile. Icons that imply direction (arrows, progress bars, back buttons) must be mirrored. Interaction patterns, such as side drawers and navigation rails, originate from the right side of the viewport. Spacing follows a 4px baseline rhythm to maintain alignment across varied typography weights.

## Elevation & Depth

Visual hierarchy is achieved through **Tonal Layers** and precise **Low-contrast outlines**. Instead of heavy shadows which can muddy the appearance of Persian script, we use background color shifts and 1px borders in slightly darker/lighter tints of the neutral palette.

When shadows are necessary for high-elevation components (like modals), they are highly diffused and neutral, avoiding any color tinting that might conflict with the Deep Blue brand color. The goal is a "flat-plus" appearance where depth is implied by overlap and subtle contrast rather than physical skeuomorphism.

## Shapes

The shape language is **Soft**, utilizing 4px (0.25rem) corner radii for standard components. This provides a professional, "engineered" feel that is more approachable than sharp corners but more serious than fully rounded elements. Larger containers like cards or modals may use up to 12px (0.75rem) to soften the overall interface composition.

## Components

### Buttons
Primary buttons use the Deep Blue background with White text. Icons are placed to the right of the text label. The "Red" accent color is reserved strictly for destructive actions or urgent alerts.

### Input Fields
Inputs feature a 1px neutral border that thickens to 2px in Deep Blue upon focus. Labels are right-aligned above the field. Error states use the Red accent color for both the border and the helper text below the field.

### Cards
Cards use a white background with a subtle 1px border (#E2E8F0). They do not use shadows by default. Content within cards follows a right-to-left flow, with primary metadata positioned in the top-right corner.

### Lists & Navigation
Navigation items use "Medium" weight text. Active states are indicated by a right-aligned vertical "accent bar" in Deep Blue and a subtle background tint.

### RTL Considerations
- **Checkboxes/Radios:** Positioned to the right of their labels.
- **Breadcrumbs:** Separators point left (e.g., Home ← Category ← Page).
- **Progress Bars:** Fill from right to left.


### Icon usage
- **Only use Lucide-react** provides so much icon that you can use easily