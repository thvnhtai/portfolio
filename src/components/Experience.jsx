import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Experience.css'

const experiences = [
  {
    id: 1,
    company: 'Grab Holdings Limited',
    role: 'Software Engineer',
    period: 'Jun 2025 - Present',
    location: 'Ho Chi Minh City',
    description: [
      'Contributed to Micro-frontend architecture using Module Federation',
      'Built complex state management strategies with Zustand and TanStack Query',
      'Implemented API Factory Pattern with Zod for type-safe API calls',
      'Integrated Monaco Editor with support for custom DSL languages',
      'Developed enterprise UI components using Ant Design',
    ],
    technologies: ['React', 'TypeScript', 'Module Federation', 'Zustand', 'TanStack Query', 'Zod', 'Ant Design'],
  },
  {
    id: 2,
    company: 'TMA Solutions',
    role: 'Intern Frontend Developer',
    period: 'Dec 2024 - Mar 2025',
    location: 'Ho Chi Minh City',
    description: [
      'Developed voucher management system dashboard using Next.js, Material UI, and Tailwind CSS',
      'Built interactive data visualization reports with advanced filtering capabilities',
      'Implemented responsive design ensuring optimal user experience across devices',
      'Collaborated with team members to deliver high-quality features on time',
      'Participated in code reviews and followed best practices for maintainable code',
    ],
    technologies: ['Next.js', 'Material UI', 'Tailwind CSS', 'TypeScript', 'React'],
  },
]

function Experience() {
  const [expandedId, setExpandedId] = useState(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id)
  }

  return (
    <section id="experience" className="experience">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Experience</span>
          <h2 className="section-title">Work Experience</h2>
        </motion.div>

        <div className="experience-timeline">
          <motion.div
            className="timeline-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />

          <motion.div
            className="experience-list"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                className={`experience-item ${expandedId === exp.id ? 'expanded' : ''}`}
                variants={itemVariants}
              >
                <div className="experience-dot" onClick={() => toggleExpand(exp.id)} />
                <div className="experience-content">
                  <div className="experience-header" onClick={() => toggleExpand(exp.id)}>
                    <div>
                      <h3 className="experience-role">{exp.role}</h3>
                      <h4 className="experience-company">{exp.company}</h4>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-period">{exp.period}</span>
                      <span className="experience-location">{exp.location}</span>
                    </div>
                  </div>
                  <AnimatePresence>
                    {expandedId === exp.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <ul className="experience-description">
                          {exp.description.map((item, itemIndex) => (
                            <li key={itemIndex}>{item}</li>
                          ))}
                        </ul>
                        <div className="experience-technologies">
                          {exp.technologies.map((tech, techIndex) => (
                            <span key={techIndex} className="tech-badge">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Experience
