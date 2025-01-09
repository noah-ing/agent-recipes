'use client'

import { motion } from 'framer-motion'
import { WorkflowCard, WorkflowCardProps } from './workflow-card'

export function AnimatedWorkflowCard(props: WorkflowCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      // Add accessibility attributes
      role="article"
      aria-label={`${props.title} workflow`}
      tabIndex={0}
    >
      <WorkflowCard {...props} />
    </motion.div>
  )
}

