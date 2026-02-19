import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Testimonials.css'

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Product Manager',
    company: 'Tech Corp',
    content: 'Exceptional frontend developer who consistently delivers high-quality work. Great attention to detail and always meets deadlines.',
    avatar: '👨‍💼',
    rating: 5,
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Design Lead',
    company: 'Design Studio',
    content: 'Working with this developer was a pleasure. They understand design principles and bring ideas to life beautifully.',
    avatar: '👩‍🎨',
    rating: 5,
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'Outstanding technical skills and problem-solving abilities. Highly recommend for any frontend project.',
    avatar: '👨‍💻',
    rating: 5,
  },
]

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const goToSlide = (index) => {
    setCurrentIndex(index)
  }

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="testimonials">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What People Say</h2>
        </motion.div>

        <div className="testimonials-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="star">⭐</span>
                ))}
              </div>
              <p className="testimonial-content">"{testimonials[currentIndex].content}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">{testimonials[currentIndex].avatar}</div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">{testimonials[currentIndex].name}</h3>
                  <p className="testimonial-role">
                    {testimonials[currentIndex].role} at {testimonials[currentIndex].company}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls">
            <button className="carousel-btn" onClick={goToPrev} aria-label="Previous">
              ←
            </button>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button className="carousel-btn" onClick={goToNext} aria-label="Next">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
