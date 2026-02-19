import { motion } from 'framer-motion'
import './LoadingSkeleton.css'

function LoadingSkeleton({ type = 'card', count = 1 }) {
  const skeletons = Array.from({ length: count })

  if (type === 'card') {
    return (
      <>
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            className="skeleton-card"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="skeleton-image" />
            <div className="skeleton-content">
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-text" />
              <div className="skeleton-line skeleton-text short" />
            </div>
          </motion.div>
        ))}
      </>
    )
  }

  if (type === 'text') {
    return (
      <>
        {skeletons.map((_, index) => (
          <div key={index} className="skeleton-line" />
        ))}
      </>
    )
  }

  return null
}

export default LoadingSkeleton
