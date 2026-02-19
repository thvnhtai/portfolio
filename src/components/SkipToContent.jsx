import { motion } from 'framer-motion'
import './SkipToContent.css'

function SkipToContent() {
  const handleSkip = () => {
    const main = document.querySelector('main')
    if (main) {
      main.focus()
      main.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <motion.a
      href="#hero"
      className="skip-to-content"
      onClick={(e) => {
        e.preventDefault()
        handleSkip()
      }}
      initial={{ y: -100 }}
      whileFocus={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      Skip to main content
    </motion.a>
  )
}

export default SkipToContent
