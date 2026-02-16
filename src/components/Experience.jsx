import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
  {
    id: 1,
    company: 'Tech Company A',
    role: 'Senior Frontend Engineer',
    period: '2022 - Present',
    location: 'Ho Chi Minh City',
    description: [
      'Lead frontend development for multiple products with a team of 8+ developers',
      'Architect and implement scalable React applications with micro-frontend architecture',
      'Mentor junior developers and establish coding standards for the team',
      'Collaborate with Product and Design teams to deliver high-quality features',
      'Optimize application performance, reducing load time from 5s to 1.2s',
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'GraphQL', 'AWS'],
  },
  {
    id: 2,
    company: 'Startup B',
    role: 'Frontend Engineer',
    period: '2020 - 2022',
    location: 'Remote',
    description: [
      'Develop and maintain web applications for SaaS platform',
      'Implement responsive designs and ensure cross-browser compatibility',
      'Build reusable component library used across multiple projects',
      'Work with backend team to integrate RESTful APIs',
      'Participate in code reviews and contribute to technical decisions',
    ],
    technologies: ['React', 'Vue.js', 'Redux', 'Styled Components', 'Jest'],
  },
  {
    id: 3,
    company: 'Agency C',
    role: 'Frontend Developer',
    period: '2019 - 2020',
    location: 'Ho Chi Minh City',
    description: [
      'Build custom websites and web applications for clients',
      'Convert designs from Figma/Adobe XD into pixel-perfect implementations',
      'Optimize websites for SEO and performance',
      'Work with multiple clients simultaneously and manage deadlines',
      'Learn and apply new technologies quickly in a fast-paced environment',
    ],
    technologies: ['React', 'JavaScript', 'CSS3', 'WordPress', 'PHP'],
  },
]

function Experience() {
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
                className="experience-item"
                variants={itemVariants}
              >
                <div className="experience-dot" />
                <div className="experience-content">
                  <div className="experience-header">
                    <div>
                      <h3 className="experience-role">{exp.role}</h3>
                      <h4 className="experience-company">{exp.company}</h4>
                    </div>
                    <div className="experience-meta">
                      <span className="experience-period">{exp.period}</span>
                      <span className="experience-location">{exp.location}</span>
                    </div>
                  </div>
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
