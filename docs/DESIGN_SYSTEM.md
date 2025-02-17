# Design System Documentation

## Overview

The design system provides a flexible and consistent theming solution with three predefined themes: Cool & Professional, Modern Brutalism, and Neon Cyberpunk. Built on top of Tailwind CSS, it extends Tailwind's utility-first approach while providing theme-specific customizations.

## Features

- 🎨 Three distinct themes with unique visual characteristics
- 🌓 Built-in dark mode support with system preference detection
- 🎯 Component-level styling with hover states
- 📱 Responsive design with Tailwind's mobile-first approach
- 🏢 Multi-tenant support through PayloadCMS
- 🎭 Seamless integration with Tailwind CSS and Shadcn UI

## Theme Structure

Each theme extends Tailwind's base configuration with the following customizations:

### Colors

The color system extends Tailwind's color palette with semantic tokens:

```typescript
colors: {
  background: string // bg-background
  foreground: string // text-foreground
  card: string // bg-card
  cardForeground: string // text-card-foreground
  popover: string // bg-popover
  popoverForeground: string // text-popover-foreground
  primary: string // text-primary, bg-primary
  primaryForeground: string // text-primary-foreground
  secondary: string // text-secondary, bg-secondary
  secondaryForeground: string // text-secondary-foreground
  muted: string // text-muted, bg-muted
  mutedForeground: string // text-muted-foreground
  accent: string // text-accent, bg-accent
  accentForeground: string // text-accent-foreground
  destructive: string // text-destructive, bg-destructive
  destructiveForeground: string // text-destructive-foreground
  border: string // border-border
  input: string // border-input
  ring: string // ring-ring
}
```

### Typography

Typography settings extend Tailwind's typography system with the following utilities:

```typescript
// Font Families
font - sans // Base font
font - heading // Heading font
font - mono // Monospace font

// Font Weights
font - normal
font - medium
font - semibold
font - bold

// Letter Spacing
tracking - tight
tracking - normal
tracking - wide

// Line Height
leading - normal // Base line height
```

### Layout & Spacing

Layout utilities follow a mobile-first approach with responsive breakpoints:

```typescript
// Container
.container // Base container (mobile)
md:container // Tablet container
lg:container // Desktop container

// Container Padding
// Mobile (default)
.container { padding: var(--layout-containerPadding) }
// Tablet (md)
@screen md {
  .container { padding: var(--layout-containerPaddingTablet) }
}
// Desktop (lg)
@screen lg {
  .container { padding: var(--layout-containerPaddingDesktop) }
}

// Section Spacing
py-section // Base section padding (mobile)
md:py-section-md // Tablet section padding
lg:py-section-lg // Desktop section padding
```

### Breakpoints

The design system follows Tailwind's mobile-first approach with these breakpoints:

```typescript
screens: {
  'sm': '640px',   // Small devices
  'md': '768px',   // Tablets
  'lg': '1024px',  // Desktop
  'xl': 'var(--layout-containerWidth)' // Max container width
}
```

### Border Radius

Consistent border radius utilities:

```typescript
rounded - sm // Small radius
rounded // Default radius
rounded - md // Medium radius
rounded - lg // Large radius
```

### Component-Specific Utilities

Pre-configured utilities for common component patterns:

```typescript
// Transitions
transition - button // Button transition
hover: scale - button - hover // Button hover scale
hover: opacity - button - hover // Button hover opacity

// Shadows
shadow - card // Card shadow

// Padding
p - card // Card padding
p - button // Button padding
p - input // Input padding

// Heights
h - input // Input height
```

## Usage Examples

### Container Layout

```tsx
// Responsive container with proper padding
<div className="container">
  <div className="py-section">
    {' '}
    // Responsive section padding
    {/* Content */}
  </div>
</div>
```

### Typography

```tsx
// Heading with proper font family and tracking
<h1 className={cn(
  'font-heading',
  'text-4xl lg:text-6xl',
  'tracking-tight',
  'font-bold'
)}>
  {title}
</h1>

// Body text with semantic color
<p className={cn(
  'text-muted-foreground',
  'text-base',
  'font-sans'
)}>
  {content}
</p>
```

### Grid Layout

```tsx
// Responsive grid with proper gap
<div className={cn('grid gap-grid-gap', 'md:grid-cols-2', 'lg:grid-cols-4')}>
  {/* Grid items */}
</div>
```

### Interactive Elements

```tsx
// Button with hover effects
<button className={cn(
  'transition-button',
  'hover:scale-button-hover',
  'hover:opacity-button-hover'
)}>
  Click me
</button>

// Card with shadow and padding
<div className={cn(
  'p-card',
  'shadow-card',
  'rounded-md',
  'bg-card'
)}>
  {/* Card content */}
</div>
```

### Form Elements

```tsx
// Input field
<input className={cn('h-input', 'p-input', 'rounded-sm', 'border-input')} />
```

## Best Practices

1. **Use Semantic Color Tokens**

   ```tsx
   // ✅ Good: Using semantic tokens
   <div className="bg-background text-foreground">

   // ❌ Bad: Using raw colors
   <div className="bg-white text-black">
   ```

2. **Responsive Typography**

   ```tsx
   // ✅ Good: Responsive font sizes with proper tracking
   <h1 className="font-heading text-4xl lg:text-6xl tracking-tight">

   // ❌ Bad: Fixed font size without proper typography
   <h1 className="text-4xl">
   ```

3. **Consistent Spacing**

   ```tsx
   // ✅ Good: Using theme spacing
   <section className="py-section md:py-section-md lg:py-section-md">

   // ❌ Bad: Arbitrary spacing
   <section className="py-24">
   ```

4. **Component Styling**

   ```tsx
   // ✅ Good: Using component-specific utilities
   <button className="transition-button hover:scale-button-hover">

   // ❌ Bad: Custom transitions
   <button className="transition-all duration-200 hover:scale-105">
   ```

5. **Mobile-First Development**

   ```tsx
   // ✅ Good: Mobile-first approach
   <div className="p-4 md:p-6 lg:p-8">

   // ❌ Bad: Desktop-first approach
   <div className="p-8 sm:p-6 xs:p-4">
   ```

6. **Responsive Layout**

   ```tsx
   // ✅ Good: Mobile-first grid
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

   // ❌ Bad: Desktop-first grid
   <div className="grid grid-cols-4 sm:grid-cols-2 xs:grid-cols-1 gap-4">
   ```

7. **Container Usage**

   ```tsx
   // ✅ Good: Mobile-first container with responsive padding
   <div className="container mx-auto">

   // ❌ Bad: Fixed padding without responsive adjustments
   <div className="max-w-7xl mx-auto px-8">
   ```

8. **Section Spacing**

   ```tsx
   // ✅ Good: Mobile-first section spacing
   <section className="py-section md:py-section-md lg:py-section-lg">

   // ❌ Bad: Desktop-first spacing
   <section className="py-24 sm:py-16 xs:py-8">
   ```

## Theme Customization

To customize the theme, modify the theme configuration in `src/themes/index.ts`. All theme variables will be automatically reflected in the Tailwind utilities.

## Future Enhancements

1. **Custom Theme Builder**: Visual theme customization tool
2. **Component Presets**: Additional preset styles for Shadcn UI components
3. **Animation Library**: Predefined animation classes
4. **Color Palette Generator**: Tool to generate theme-compatible color schemes
5. **Theme Analytics**: Track component and utility class usage
