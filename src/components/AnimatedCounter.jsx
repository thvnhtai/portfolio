import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      const startValue = 0
      const endValue = parseInt(value.toString().replace(/\D/g, ''))
      const increment = endValue / (duration / 16)
      
      let current = startValue
      const timer = setInterval(() => {
        current += increment
        if (current >= endValue) {
          setCount(endValue)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value, duration])

  const displayValue = value.toString().includes('+')
    ? `${count}+`
    : value.toString().includes('K')
    ? `${(count / 1000).toFixed(1)}K`
    : count

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export default AnimatedCounter
