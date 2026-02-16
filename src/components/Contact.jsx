import { useState } from 'react'
import { motion } from 'framer-motion'
import './Contact.css'

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com',
    icon: 'github',
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com',
    icon: 'linkedin',
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'email',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com',
    icon: 'twitter',
  },
]

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false)
        alert('Thank you for reaching out! I will get back to you as soon as possible.')
        setFormData({ name: '', email: '', message: '' })
      }, 1000)
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="contact" className="contact">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
        </motion.div>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.div variants={itemVariants} className="info-item">
              <h3 className="info-title">Let's Work Together</h3>
              <p className="info-description">
                I'm always open to discussing new projects, collaboration opportunities,
                or simply connecting with the developer community.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="info-item">
              <h4 className="info-subtitle">Email</h4>
              <a href="mailto:your.email@example.com" className="info-link">
                your.email@example.com
              </a>
            </motion.div>

            <motion.div variants={itemVariants} className="info-item">
              <h4 className="info-subtitle">Social Media</h4>
              <div className="social-links">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon === 'github' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    {link.icon === 'linkedin' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    {link.icon === 'email' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    {link.icon === 'twitter' && (
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"
                          fill="currentColor"
                        />
                      </svg>
                    )}
                    <span className="social-link-label">{link.name}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.form
            className="contact-form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="Enter your name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                required
                placeholder="your.email@example.com"
              />
            </div>
            <div className="form-group">
              <label htmlFor="message" className="form-label">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="form-textarea"
                rows="6"
                required
                placeholder="Tell me about your project..."
              />
            </div>
            <motion.button
              type="submit"
              className="form-submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
