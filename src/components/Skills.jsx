import { motion } from 'framer-motion'
import './Skills.css'

const skillCategories = [
  {
    title: 'Frontend Core',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'JavaScript (ES6+)', level: 95 },
      { name: 'HTML5 / CSS3', level: 95 },
    ],
  },
  {
    title: 'Frameworks & Libraries',
    skills: [
      { name: 'Next.js', level: 90 },
      { name: 'Vue.js', level: 85 },
      { name: 'Redux / Zustand', level: 90 },
      { name: 'React Query', level: 88 },
    ],
  },
  {
    title: 'Styling & Design',
    skills: [
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Styled Components', level: 90 },
      { name: 'CSS Modules', level: 92 },
      { name: 'Framer Motion', level: 88 },
    ],
  },
  {
    title: 'Tools & Others',
    skills: [
      { name: 'Git / GitHub', level: 95 },
      { name: 'Webpack / Vite', level: 90 },
      { name: 'Jest / Testing Library', level: 85 },
      { name: 'CI/CD', level: 85 },
    ],
  },
]

function Skills() {
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
    <section id="skills" className="skills">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Skills</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              className="skill-category"
              variants={itemVariants}
            >
              <h3 className="category-title">{category.title}</h3>
              <div className="skills-list">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div
                    key={skillIndex}
                    className="skill-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: skillIndex * 0.1 }}
                  >
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.level}%</span>
                    </div>
                    <div className="skill-bar">
                      <motion.div
                        className="skill-bar-fill"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: skillIndex * 0.1, ease: 'easeOut' }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Skills
