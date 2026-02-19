import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './InteractiveTerminal.css'

const commands = [
  { text: 'npm install creativity', delay: 500 },
  { text: 'npm install innovation', delay: 1000 },
  { text: 'npm install passion', delay: 1500 },
  { text: 'npm start', delay: 2000 },
  { text: '> Building amazing experiences...', delay: 2500 },
  { text: '> ✓ Portfolio ready!', delay: 3000 },
]

function InteractiveTerminal() {
  const [displayedCommands, setDisplayedCommands] = useState([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)

  useEffect(() => {
    if (currentIndex < commands.length) {
      setIsTyping(true)
      const timer = setTimeout(() => {
        setDisplayedCommands((prev) => [...prev, commands[currentIndex]])
        setIsTyping(false)
        setCurrentIndex((prev) => prev + 1)
      }, commands[currentIndex].delay)

      return () => clearTimeout(timer)
    }
  }, [currentIndex])

  const resetTerminal = () => {
    setDisplayedCommands([])
    setCurrentIndex(0)
    setIsTyping(false)
  }

  return (
    <div className="interactive-terminal">
      <div className="terminal-header">
        <div className="terminal-dots">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
        </div>
        <span className="terminal-title">Terminal</span>
        <button className="terminal-reset" onClick={resetTerminal}>
          ↻ Reset
        </button>
      </div>
      <div className="terminal-body">
        <div className="terminal-content">
          <AnimatePresence>
            {displayedCommands.map((cmd, index) => (
              <motion.div
                key={index}
                className="terminal-line"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <span className="terminal-prompt">$</span>
                <span className="terminal-command">{cmd.text}</span>
              </motion.div>
            ))}
          </AnimatePresence>
          {isTyping && (
            <motion.div
              className="terminal-line"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <span className="terminal-prompt">$</span>
              <motion.span
                className="terminal-cursor"
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                _
              </motion.span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default InteractiveTerminal
