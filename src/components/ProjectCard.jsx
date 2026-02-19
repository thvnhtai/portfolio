import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useDragControls } from 'framer-motion'
import './ProjectCard.css'

function ProjectCard({ project, onViewDetails }) {
  const cardRef = useRef(null)
  const [dragDirection, setDragDirection] = useState(null)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const dragX = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7.5deg', '-7.5deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7.5deg', '7.5deg'])

  const handleMouseMove = (e) => {
    if (!cardRef.current || window.innerWidth <= 768) return
    
    const rect = cardRef.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  const handleDragEnd = (event, info) => {
    const threshold = 100
    if (Math.abs(info.offset.x) > threshold) {
      if (info.offset.x > 0) {
        setDragDirection('right')
      } else {
        setDragDirection('left')
      }
      // Trigger view details on swipe
      setTimeout(() => {
        onViewDetails(project)
        setDragDirection(null)
      }, 300)
    } else {
      dragX.set(0)
    }
  }

  return (
    <motion.div
      ref={cardRef}
      className={`project-card ${project.featured ? 'featured' : ''} ${dragDirection ? `swipe-${dragDirection}` : ''}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
      style={{
        rotateX: window.innerWidth > 768 ? rotateX : 0,
        rotateY: window.innerWidth > 768 ? rotateY : 0,
        transformStyle: 'preserve-3d',
        x: dragX,
      }}
      whileHover={{ y: window.innerWidth > 768 ? -8 : 0 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="project-image">
        {project.image.startsWith('/') ? (
          <img 
            src={project.image} 
            alt={project.title}
            loading="lazy"
            className="project-image-img"
          />
        ) : (
          <div className="project-emoji">{project.image}</div>
        )}
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
          <motion.button
            onClick={() => onViewDetails(project)}
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
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

export default ProjectCard
