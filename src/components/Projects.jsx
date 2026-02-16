import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './Projects.css'

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A modern e-commerce platform with real-time inventory management, payment integration, and advanced search capabilities.',
    technologies: ['React', 'TypeScript', 'Next.js', 'Stripe', 'PostgreSQL'],
    image: '🛒',
    category: 'Full Stack',
    featured: true,
  },
  {
    id: 2,
    title: 'Dashboard Analytics',
    description: 'Data analytics dashboard with real-time charts, data visualization, and customizable widgets for business intelligence.',
    technologies: ['React', 'D3.js', 'TypeScript', 'WebSocket'],
    image: '📊',
    category: 'Frontend',
    featured: true,
  },
  {
    id: 3,
    title: 'Social Media App',
    description: 'Social media application with real-time messaging, feed algorithm optimization, and media handling.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    image: '💬',
    category: 'Full Stack',
    featured: false,
  },
  {
    id: 4,
    title: 'Task Management Tool',
    description: 'Project management tool with kanban board, time tracking, and collaboration features.',
    technologies: ['Vue.js', 'TypeScript', 'Firebase', 'PWA'],
    image: '✅',
    category: 'Frontend',
    featured: false,
  },
  {
    id: 5,
    title: 'Learning Platform',
    description: 'Online learning platform with video streaming, interactive quizzes, and progress tracking.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'AWS'],
    image: '🎓',
    category: 'Full Stack',
    featured: false,
  },
  {
    id: 6,
    title: 'Portfolio Website',
    description: 'Responsive portfolio website with animations, dark mode, and performance optimization.',
    technologies: ['React', 'Framer Motion', 'Vite', 'CSS3'],
    image: '🎨',
    category: 'Frontend',
    featured: false,
  },
]

function Projects() {
  const [filter, setFilter] = useState('All')
  const [hoveredProject, setHoveredProject] = useState(null)

  const categories = ['All', 'Frontend', 'Full Stack']
  const filteredProjects =
    filter === 'All'
      ? projects
      : projects.filter((project) => project.category === filter)

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
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  }

  return (
    <section id="projects" className="projects">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Projects</span>
          <h2 className="section-title">Featured Projects</h2>
        </motion.div>

        <motion.div
          className="filter-buttons"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${filter === category ? 'active' : ''}`}
              onClick={() => setFilter(category)}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className={`project-card ${project.featured ? 'featured' : ''}`}
                variants={itemVariants}
                onHoverStart={() => setHoveredProject(project.id)}
                onHoverEnd={() => setHoveredProject(null)}
                whileHover={{ y: -8 }}
                layout
              >
                <div className="project-image">
                  <div className="project-emoji">{project.image}</div>
                  {project.featured && (
                    <span className="featured-badge">Featured</span>
                  )}
                </div>
                <div className="project-content">
                  <div className="project-header">
                    <h3 className="project-title">{project.title}</h3>
                    <span className="project-category">{project.category}</span>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="project-actions">
                    <motion.a
                      href="#"
                      className="project-link"
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Details
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M6 12L10 8L6 4"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
