import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Navigation from './components/Navigation'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Update active section based on scroll position
      const sections = ['hero', 'about', 'skills', 'projects', 'experience', 'contact']
      const current = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="app">
      <Navigation activeSection={activeSection} scrollY={scrollY} />
      
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Background gradient effect */}
      <div className="bg-gradient" />
      
      {/* Cursor trail effect */}
      <motion.div
        className="cursor-trail"
        animate={{
          scale: scrollY > 100 ? 0 : 1,
          opacity: scrollY > 100 ? 0 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  )
}

export default App
