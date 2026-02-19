import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import './SkillsRadar.css'

const skillsData = [
  { name: 'React', level: 95, color: '#61dafb' },
  { name: 'TypeScript', level: 90, color: '#3178c6' },
  { name: 'JavaScript', level: 95, color: '#f7df1e' },
  { name: 'CSS/SCSS', level: 92, color: '#1572b6' },
  { name: 'Node.js', level: 85, color: '#339933' },
  { name: 'Git', level: 90, color: '#f05032' },
]

function SkillsRadar() {
  const canvasRef = useRef(null)
  const isInView = useInView(canvasRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!isInView || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 40
    const angleStep = (Math.PI * 2) / skillsData.length

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid circles
    for (let i = 1; i <= 5; i++) {
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(centerX, centerY, (radius * i) / 5, 0, Math.PI * 2)
      ctx.stroke()
    }

    // Draw grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
    ctx.lineWidth = 1
    for (let i = 0; i < skillsData.length; i++) {
      const angle = i * angleStep - Math.PI / 2
      const x = centerX + Math.cos(angle) * radius
      const y = centerY + Math.sin(angle) * radius
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.lineTo(x, y)
      ctx.stroke()
    }

    // Draw radar area
    ctx.fillStyle = 'rgba(0, 217, 255, 0.2)'
    ctx.strokeStyle = 'rgba(0, 217, 255, 0.8)'
    ctx.lineWidth = 2
    ctx.beginPath()

    skillsData.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.closePath()
    ctx.fill()
    ctx.stroke()

    // Draw skill points and labels
    skillsData.forEach((skill, index) => {
      const angle = index * angleStep - Math.PI / 2
      const skillRadius = (radius * skill.level) / 100
      const x = centerX + Math.cos(angle) * skillRadius
      const y = centerY + Math.sin(angle) * skillRadius

      // Draw point
      ctx.fillStyle = skill.color
      ctx.beginPath()
      ctx.arc(x, y, 6, 0, Math.PI * 2)
      ctx.fill()

      // Draw label
      const labelX = centerX + Math.cos(angle) * (radius + 20)
      const labelY = centerY + Math.sin(angle) * (radius + 20)
      ctx.fillStyle = '#ffffff'
      ctx.font = '14px var(--font-display)'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText(skill.name, labelX, labelY)
    })
  }, [isInView])

  return (
    <div className="skills-radar-container">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="skills-radar-canvas"
      />
      <div className="skills-legend">
        {skillsData.map((skill) => (
          <div key={skill.name} className="legend-item">
            <div
              className="legend-color"
              style={{ backgroundColor: skill.color }}
            />
            <span className="legend-name">{skill.name}</span>
            <span className="legend-level">{skill.level}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SkillsRadar
