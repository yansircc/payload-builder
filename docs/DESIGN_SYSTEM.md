# Design System Documentation

## Overview

The design system provides a flexible and consistent theming solution with three predefined themes: Modern, Minimal, and Bold. Built on top of Tailwind CSS, it extends Tailwind's utility-first approach while providing theme-specific customizations.

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

### Modern & Clean

- Contemporary design with balanced proportions
- Subtle animations and transitions
- Professional and versatile appearance

### Minimal & Elegant

- Clean and understated design
- Reduced visual complexity
- Focus on content and typography

### Bold & Dynamic

- Strong visual presence
- Dramatic hover effects
- Larger spacing and typography

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

export default {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // ... other theme colors
      },
      fontFamily: {
        sans: ['var(--typography-fontFamily)'],
        heading: ['var(--typography-headingFamily)'],
      },
      // ... other theme extensions
    },
  },
}
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

1. **Use Tailwind Classes**: Prefer Tailwind utility classes over custom CSS whenever possible.
2. **Component Composition**: Use Shadcn UI components as building blocks and customize them with Tailwind classes.
3. **Dark Mode**: Use Tailwind's `dark:` modifier for dark mode styles.
4. **Responsive Design**: Use Tailwind's responsive modifiers (`sm:`, `md:`, `lg:`, etc.).
5. **Theme Variables**: Use theme-provided CSS variables through Tailwind's utility classes.

### Responsive Design Example

```tsx
<div
  className="
  p-4 md:p-6 lg:p-8
  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
  gap-4 md:gap-6
"
>
  {/* Content */}
</div>
```

### Dark Mode Example

```tsx
<Card
  className="
  bg-card dark:bg-card
  text-card-foreground dark:text-card-foreground
  shadow-sm dark:shadow-md
"
>
  {/* Content */}
</Card>
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
