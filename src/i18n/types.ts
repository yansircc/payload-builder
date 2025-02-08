// Automatically generated types file - do not modify manually

// Basic translation type
export interface Translation {
  en: string
  zh: string
}

// Common fields translation
export interface CommonFields {
  tenant: Translation // Tenant
  title: Translation // Title
  hero: Translation // Hero
  meta: Translation // Meta
  image: Translation // Maximum upload file size: 12MB. Recommended file size for images is <500KB.
  description: Translation // Description
  publishedAt: Translation // Published at
  slug: Translation // Slug
  slugLock: Translation // Slug lock
  _status: Translation // _status
  subtitle: Translation // Subtitle text
  badge: Translation // Badge text displayed above title
  links: Translation // Hero buttons
  link: Translation // Hero button
  type: Translation // Type
  newTab: Translation // New tab
  reference: Translation // Reference
  url: Translation // Url
  label: Translation // Label
  prefixIcon: Translation // Optional: Lucide icon name for prefix (e.g., "ArrowLeft")
  suffixIcon: Translation // Optional: Lucide icon name for suffix (e.g., "ArrowRight")
  appearance: Translation // Choose how the link should be rendered.
  rating: Translation // Rating information
  rate: Translation // Rating value (0-5)
  count: Translation // Number of ratings
  avatars: Translation // User avatars (3-5)
  logo: Translation // Partner logo image
  partners: Translation // Partner logos (1-6)
  features: Translation // Feature list (exactly 4 items)
  media: Translation // Hero media
  style: Translation // Style
  blockName: Translation // Block name
  cta: Translation // CTA section fields
  icon: Translation // Optional: Lucide icon name (e.g., CheckCircle)
  lists: Translation // List with icons
  heading: Translation // The heading text above the title
  introContent: Translation // Intro content
  root: Translation // Root
  children: Translation // Children
  version: Translation // Version
  direction: Translation // Direction
  format: Translation // Format
  indent: Translation // Indent
  categories: Translation // Categories
  form: Translation // Form
  gallery: Translation // Gallery section fields
  items: Translation // Gallery items (1-6)
  sections: Translation // Gallery sections (1-6)
  feature: Translation // Feature section fields
  testimonial: Translation // Testimonial
  quote: Translation // Testimonial quote text
  testimonials: Translation // Testimonial items (exactly 4 required - 1 featured + 3 grid)
  authorName: Translation // Name of the testimonial author
  authorRole: Translation // Role/position of the author
  authorImage: Translation // Author profile image
  logos: Translation // Company logos (1-5)
  subheading: Translation // Subheading text
  statsText: Translation // Stats text shown with icon
  contact: Translation // Contact form fields
  list: Translation // List with icons
  submitButton: Translation // Submit button
  fields: Translation // Fields
  supportList: Translation // Support list
  supports: Translation // Support cards
  officeList: Translation // Office list
  offices: Translation // Office cards
  team: Translation // Team fields
  people: Translation // Members
  faq: Translation // FAQ fields
  faqs: Translation // List FAQ
  support: Translation // Support list
  supportLink: Translation // Support link
  header: Translation // Header fields
  menu: Translation // Header navigation columns
  rightSideLinks: Translation // Right side links
  rightLinks: Translation // Right links
  footer: Translation // Footer fields
  copyright: Translation // Footer copyright
  socialLinks: Translation // Social links
  leftLinks: Translation // Left links
  bottomText: Translation // Bottom text
  content: Translation // Content
  filename: Translation // Filename
  mimeType: Translation // Mime type
  filesize: Translation // Filesize
  width: Translation // Width
  height: Translation // Height
}

// Collection specific field translation type
export interface CollectionFields {
  [key: string]: Translation
}

// Collection labels type
export interface CollectionLabels {
  singular: Translation
  plural: Translation
  fields: CollectionFields
}

// All collections type
export interface Collections {
  pages: CollectionLabels
  posts: CollectionLabels
  media: CollectionLabels
  categories: CollectionLabels
  users: CollectionLabels
  header: CollectionLabels
  footer: CollectionLabels
}
