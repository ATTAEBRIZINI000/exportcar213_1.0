'use client'

import { motion } from 'framer-motion'

const variants = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0 },
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={variants}
      initial={false}
      animate="visible"
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  )
}
