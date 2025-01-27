 'use client'

import { motion } from 'framer-motion'

// Export client-side animation components
export const ClientMotionDiv = motion.div

// Animation variants
export const fadeInFromBottom = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}