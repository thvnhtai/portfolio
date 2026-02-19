import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './EasterEggs.css'

const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'KeyB',
  'KeyA',
]

function EasterEggs() {
  const [konamiIndex, setKonamiIndex] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (konamiIndex < KONAMI_CODE.length) {
        if (e.code === KONAMI_CODE[konamiIndex]) {
          if (konamiIndex === KONAMI_CODE.length - 1) {
            setShowEasterEgg(true)
            setKonamiIndex(0)
            setTimeout(() => setShowEasterEgg(false), 5000)
          } else {
            setKonamiIndex((prev) => prev + 1)
          }
        } else {
          setKonamiIndex(0)
        }
      }
    }

    const handleEasterEggTrigger = () => {
      setShowEasterEgg(true)
      setTimeout(() => setShowEasterEgg(false), 3000)
    }

    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('easterEggTrigger', handleEasterEggTrigger)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('easterEggTrigger', handleEasterEggTrigger)
    }
  }, [konamiIndex])

  return (
    <>
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            className="easter-egg-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
          >
            <motion.div
              className="easter-egg-content"
              initial={{ scale: 0.5, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0.5, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
            >
              <h2>🎉 Easter Egg Found! 🎉</h2>
              <p>You're awesome! Thanks for exploring!</p>
              <div className="easter-egg-emoji">✨🚀💻✨</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default EasterEggs
