import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './GitHubStats.css'

import { personalInfo } from '../config/personalInfo'

// Extract username from GitHub URL
const GITHUB_USERNAME = personalInfo.social.github?.replace('https://github.com/', '').replace('http://github.com/', '') || 'thvnhtai'

function GitHubStats() {
  const [stats, setStats] = useState({
    repos: 6,
    followers: 4,
    following: 4,
    contributions: 1514, // Total: 1 + 265 + 962 + 276 + 10
  })
  const [loading, setLoading] = useState(false)
  
  // Contributions by year
  const contributionsByYear = {
    2022: 1,
    2023: 265,
    2024: 962,
    2025: 276,
    2026: 10,
  }

  useEffect(() => {
    // Use static data instead of API calls
    setLoading(false)
  }, [])

  const statItems = [
    { label: 'Repositories', value: stats.repos, icon: '📦' },
    { label: 'Followers', value: stats.followers, icon: '👥' },
    { label: 'Following', value: stats.following, icon: '👤' },
    { label: 'Total Contributions', value: stats.contributions, icon: '⭐' },
  ]

  return (
    <section id="github-stats" className="github-stats">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">GitHub</span>
          <h2 className="section-title">GitHub Activity</h2>
        </motion.div>

        <div className="stats-grid">
          {statItems.map((item, index) => (
            <motion.div
              key={item.label}
              className="stat-card"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="stat-icon">{item.icon}</div>
              <div className="stat-value">
                {loading ? '...' : item.value.toLocaleString()}
              </div>
              <div className="stat-label">{item.label}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="contributions-breakdown"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="contributions-title">Contributions by Year</h3>
          <div className="contributions-grid">
            {Object.entries(contributionsByYear).map(([year, count]) => (
              <div key={year} className="contribution-item">
                <span className="contribution-year">{year}</span>
                <span className="contribution-count">{count.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.a
          href={personalInfo.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          View GitHub Profile →
        </motion.a>
      </div>
    </section>
  )
}

export default GitHubStats
