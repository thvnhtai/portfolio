import { useState, useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

function AnimatedCounter({ value, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  useEffect(() => {
    if (isInView) {
      const valueStr = value.toString()
      const isDecimal = valueStr.includes('.')
      const isPlus = valueStr.includes('+')
      const isK = valueStr.includes('K')
      
      // Parse the numeric value
      let numericValue
      if (isDecimal) {
        numericValue = parseFloat(valueStr)
      } else if (isPlus) {
        numericValue = parseInt(valueStr.replace(/\D/g, ''))
      } else if (isK) {
        numericValue = parseFloat(valueStr.replace('K', '')) * 1000
      } else {
        numericValue = parseInt(valueStr.replace(/\D/g, ''))
      }
      
      const startValue = 0
      const endValue = numericValue
      const increment = endValue / (duration / 16)
      
      let current = startValue
      const timer = setInterval(() => {
        current += increment
        if (current >= endValue) {
          setCount(endValue)
          clearInterval(timer)
        } else {
          setCount(current)
        }
      }, 16)

      return () => clearInterval(timer)
    }
  }, [isInView, value, duration])

  const valueStr = value.toString()
  const isDecimal = valueStr.includes('.')
  const isPlus = valueStr.includes('+')
  const isK = valueStr.includes('K')
  
  let displayValue
  if (isPlus) {
    displayValue = `${Math.floor(count)}+`
  } else if (isK) {
    displayValue = `${(count / 1000).toFixed(1)}K`
  } else if (isDecimal) {
    // For decimal values, format to match original decimal places
    const decimalPlaces = valueStr.split('.')[1]?.length || 2
    displayValue = count.toFixed(decimalPlaces)
  } else {
    displayValue = Math.floor(count)
  }

  return (
    <span ref={ref}>
      {displayValue}{suffix}
    </span>
  )
}

export default AnimatedCounter
