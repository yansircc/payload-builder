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

The color system extends Tailwind's color palette:

```typescript
colors: {
  background: string // Maps to bg-background
  foreground: string // Maps to text-foreground
  card: string // Maps to bg-card
  cardForeground: string // Maps to text-card-foreground
  popover: string // Popover background
  popoverForeground: string // Popover text color
  primary: string // Primary brand color
  primaryForeground: string // Text on primary color
  secondary: string // Secondary brand color
  secondaryForeground: string // Text on secondary color
  muted: string // Muted background
  mutedForeground: string // Muted text color
  accent: string // Accent color
  accentForeground: string // Text on accent color
  destructive: string // Error/destructive color
  destructiveForeground: string // Text on destructive color
  border: string // Border color
  input: string // Input border color
  ring: string // Focus ring color
}
```

These colors are automatically integrated into Tailwind's utility classes:

- `bg-background`
- `text-foreground`
- `border-border`
- etc.

### Typography

Typography settings extend Tailwind's typography system:

```typescript
typography: {
  fontFamily: string // Maps to font-sans
  headingFamily: string // Maps to font-heading
  baseFontSize: string // Configures Tailwind's text-base
  lineHeight: string // Configures Tailwind's leading-*
  fontWeights: {
    normal: string // Maps to font-normal
    medium: string // Maps to font-medium
    semibold: string // Maps to font-semibold
    bold: string // Maps to font-bold
  }
  letterSpacing: {
    tight: string // Maps to tracking-tight
    normal: string // Maps to tracking-normal
    wide: string // Maps to tracking-wide
  }
}
```

### Layout

```typescript
layout: {
  containerWidth: string // Max container width
  containerPadding: string // Container padding
  sectionSpacing: string // Vertical section spacing
  gridGap: string // Grid gap spacing
}
```

### Component Styles

Component styles are implemented using Tailwind's utility classes through Shadcn UI:

```typescript
components: {
  button: {
    padding: string // Applied via py-* and px-*
    transition: string // Applied via transition-*
    hover: {
      scale: string // Applied via hover:scale-*
      opacity: string // Applied via hover:opacity-*
    }
  }
  card: {
    padding: string // Card padding
    shadow: string // Card shadow
    hover: {
      transform: string // Hover transform effect
    }
  }
  input: {
    height: string // Input height
    padding: string // Input padding
  }
}
```

## Available Themes

### Cool & Professional

- Clean and modern design with professional aesthetics
- Subtle shadows and smooth transitions
- Geist Sans for body text and Outfit for headings
- Balanced blue-based color palette
- Rounded corners and soft shadows

### Modern Brutalism

- Bold, minimalistic design with sharp edges
- High contrast black and white base
- Monospaced typography using Geist Mono
- Sharp edges with no border radius
- Distinctive "pixel-perfect" hover effects
- Strong box shadows for depth

### Neon Cyberpunk

- Dark, futuristic design with neon accents
- Vibrant purple and cyan highlights
- Mixed typography with Geist Sans and Mono
- Larger border radius for a modern feel
- Glowing effects and smooth animations
- Dark background with high contrast elements

## Usage

### With Tailwind CSS

1. **Direct Utility Classes**:

```tsx
<div className="bg-background text-foreground">
  <h1 className="font-heading text-4xl tracking-tight">Heading</h1>
  <p className="font-sans text-base leading-relaxed">Content</p>
</div>
```

2. **Component Styling**:

```tsx
// Button component example
const Button = ({ children, variant = 'default' }) => (
  <button
    className={cn(
      // Base styles
      'inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors',
      // Variant styles
      variant === 'default' && 'bg-primary text-primary-foreground hover:bg-primary/90',
      variant === 'secondary' && 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
    )}
  >
    {children}
  </button>
)
```

3. **Dark Mode**:

```tsx
// Dark mode is handled automatically through Tailwind's dark: modifier
<div className="bg-background dark:bg-background text-foreground dark:text-foreground">Content</div>
```

### Theme Configuration

The theme system integrates with Tailwind's configuration:

```typescript
// tailwind.config.js
import { themes } from './src/themes'

/** Available theme presets */
type ThemePreset = 'cool' | 'brutal' | 'neon'

/** Base theme interface */
interface BaseTheme {
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    popover: string
    popoverForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
  }
  typography: {
    fontFamily: string
    headingFamily: string
    baseFontSize: string
    lineHeight: string
    fontWeights: {
      normal: string
      medium: string
      semibold: string
      bold: string
    }
    letterSpacing: {
      tight: string
      normal: string
      wide: string
    }
  }
  radius: {
    small: string
    default: string
    medium: string
    large: string
  }
  layout: {
    containerWidth: string
    containerPadding: string
    sectionSpacing: string
    gridGap: string
  }
  components: {
    button: {
      padding: string
      transition: string
      hover: {
        scale: string
        opacity: string
      }
    }
    card: {
      padding: string
      shadow: string
      hover: {
        transform: string
      }
    }
    input: {
      height: string
      padding: string
    }
  }
}

/** Complete theme definition */
interface ThemeDefinition extends BaseTheme {
  name: ThemePreset
  label: string
  dark: BaseTheme['colors']
}
```

### Example Theme Usage

```tsx
// Component with theme-aware styling
const Card = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <div
    ref={ref}
    className={cn(
      'bg-card text-card-foreground',
      'rounded-[--radius-medium]',
      'shadow-[--shadow-card]',
      'p-[--card-padding]',
      'transition-transform duration-200',
      'hover:transform-[--card-hover-transform]',
      props.className,
    )}
    {...props}
  />
))

// Button with theme variants
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => (
  <button
    ref={ref}
    className={cn(
      'inline-flex items-center justify-center',
      'rounded-[--radius-small]',
      'bg-primary text-primary-foreground',
      'p-[--button-padding]',
      'transition-[--button-transition]',
      'hover:scale-[--button-hover-scale]',
      'hover:opacity-[--button-hover-opacity]',
      props.className,
    )}
    {...props}
  />
))
```

### Using Shadcn UI Components

Our design system is built on top of Shadcn UI components, which are already integrated with our theme system:

```tsx
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function MyComponent() {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-heading mb-4">Card Title</h2>
      <p className="text-muted-foreground mb-4">Card content</p>
      <Button>Click Me</Button>
    </Card>
  )
}
```

## Best Practices

1. **Theme-Aware Components**
   - Use CSS variables for theme values instead of hardcoded values
   - Leverage Tailwind's utility classes with CSS variable values
   - Implement dark mode using the theme's dark color palette

```tsx
// ✅ Good: Using theme variables
<div className="bg-card text-card-foreground rounded-[--radius-medium]">

// ❌ Bad: Hardcoded values
<div className="bg-white text-black rounded-md">
```

2. **Typography System**
   - Use the appropriate font family for content type:
     - Cool theme: Geist Sans for body, Outfit for headings
     - Brutal theme: Geist Mono for both
     - Neon theme: Geist Sans for body, Geist Mono for headings
   - Apply consistent line heights and letter spacing

```tsx
// ✅ Good: Using theme typography
<h1 className="font-heading text-4xl tracking-[--letter-spacing-tight]">
<p className="font-sans text-base leading-[--line-height]">

// ❌ Bad: Inconsistent typography
<h1 className="font-arial text-4xl">
<p className="font-sans text-base leading-loose">
```

3. **Component Styling**
   - Use theme-provided spacing and sizing values
   - Implement consistent hover and transition effects
   - Follow the theme's border radius system

```tsx
// ✅ Good: Theme-consistent styling
<Button className="
  p-[--button-padding]
  transition-[--button-transition]
  hover:scale-[--button-hover-scale]
">

// ❌ Bad: Inconsistent styling
<Button className="
  p-4
  transition-all duration-300
  hover:scale-110
">
```

4. **Layout and Spacing**
   - Use the theme's container width and padding
   - Maintain consistent section spacing
   - Apply grid gaps as defined in the theme

```tsx
// ✅ Good: Theme-consistent layout
<main className="
  max-w-[--container-width]
  px-[--container-padding]
  gap-[--grid-gap]
">

// ❌ Bad: Arbitrary values
<main className="
  max-w-7xl
  px-4
  gap-4
">
```

5. **Color Usage**
   - Use semantic color tokens instead of raw color values
   - Implement proper color contrast for accessibility
   - Consider dark mode implications

```tsx
// ✅ Good: Semantic colors
<div className="
  bg-background
  text-foreground
  border-border
">

// ❌ Bad: Raw colors
<div className="
  bg-white
  text-black
  border-gray-200
">
```

6. **Responsive Design**
   - Use theme-defined breakpoints
   - Implement mobile-first approach
   - Maintain consistent spacing across viewports

```tsx
// ✅ Good: Responsive with theme values
<div className="
  p-[--container-padding-mobile]
  md:p-[--container-padding-tablet]
  lg:p-[--container-padding-desktop]
">

// ❌ Bad: Inconsistent responsive values
<div className="
  p-4
  md:p-8
  lg:p-12
">
```

7. **Theme Switching**
   - Handle theme changes gracefully
   - Ensure smooth transitions between themes
   - Maintain consistent component behavior across themes

```tsx
// ✅ Good: Theme-aware component
const ThemedCard = ({ children }) => (
  <div
    className={cn(
      'bg-card',
      'text-card-foreground',
      'transition-colors duration-200',
      'rounded-[--radius-medium]',
      'shadow-[--shadow-card]',
    )}
  >
    {children}
  </div>
)

// ❌ Bad: Theme-unaware component
const Card = ({ children }) => (
  <div
    className="
    bg-white
    text-gray-900
    rounded-lg
    shadow-md
  "
  >
    {children}
  </div>
)
```

## Theme Customization

### Extending Components

```tsx
// Example of extending a Shadcn UI component with theme variables
const CustomCard = React.forwardRef<HTMLDivElement, CardProps>((props, ref) => (
  <Card
    ref={ref}
    className={cn(
      'transition-all duration-200',
      'hover:translate-y-[-2px]',
      'dark:bg-card/90',
      props.className,
    )}
    {...props}
  />
))
```

## Future Enhancements

1. **Custom Theme Builder**: Visual theme customization tool integrated with Tailwind's config
2. **Component Presets**: Additional preset styles for Shadcn UI components
3. **Animation Library**: Predefined animation classes extending Tailwind's transitions
4. **Color Palette Generator**: Tool to generate Tailwind-compatible color schemes
5. **Theme Analytics**: Track component and utility class usage
