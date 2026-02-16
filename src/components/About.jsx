import { motion } from 'framer-motion'
import './About.css'

function About() {
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
    <section id="about" className="about">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">About</span>
          <h2 className="section-title">About Me</h2>
        </motion.div>

        <div className="about-content">
          <motion.div
            className="about-text"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <motion.p variants={itemVariants} className="about-paragraph">
              I'm a Senior Frontend Engineer with over 5 years of experience building
              modern and scalable web applications. I'm passionate about creating exceptional
              user experiences through clean code, solid architecture, and attention to detail.
            </motion.p>
            <motion.p variants={itemVariants} className="about-paragraph">
              With a strong background in the React ecosystem, TypeScript, and modern web technologies,
              I focus on building high-performance, accessible, and maintainable applications.
              I also have experience mentoring junior developers and collaborating with cross-functional teams.
            </motion.p>
            <motion.p variants={itemVariants} className="about-paragraph">
              Beyond coding, I enjoy exploring new technologies, contributing to open source projects,
              and sharing knowledge through technical blogs and talks.
            </motion.p>
          </motion.div>

          <motion.div
            className="about-highlights"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="highlight-item">
              <div className="highlight-icon">🎯</div>
              <div className="highlight-content">
                <h3 className="highlight-title">User-Centric</h3>
                <p className="highlight-description">
                  Always putting user experience at the center of every design and development decision
                </p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">⚡</div>
              <div className="highlight-content">
                <h3 className="highlight-title">Performance First</h3>
                <p className="highlight-description">
                  Optimizing performance from code level to architecture level to ensure smooth experiences
                </p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🔧</div>
              <div className="highlight-content">
                <h3 className="highlight-title">Clean Code</h3>
                <p className="highlight-description">
                  Writing maintainable, testable, and scalable code with best practices and design patterns
                </p>
              </div>
            </div>
            <div className="highlight-item">
              <div className="highlight-icon">🤝</div>
              <div className="highlight-content">
                <h3 className="highlight-title">Collaboration</h3>
                <p className="highlight-description">
                  Working effectively with teams, mentoring developers, and contributing to team growth
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
