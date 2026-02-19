import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './GitHubStats.css'

// Note: Replace with your GitHub username
const GITHUB_USERNAME = 'your-username'

function GitHubStats() {
  const [stats, setStats] = useState({
    repos: 0,
    followers: 0,
    following: 0,
    contributions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch GitHub stats
    // Note: GitHub API requires authentication for higher rate limits
    // For public access, you can use: https://api.github.com/users/${GITHUB_USERNAME}
    const fetchStats = async () => {
      try {
        // Using GitHub API (public endpoint)
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`)
        if (response.ok) {
          const data = await response.json()
          setStats({
            repos: data.public_repos || 0,
            followers: data.followers || 0,
            following: data.following || 0,
            contributions: 0, // Requires GitHub GraphQL API
          })
        }
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
        // Fallback to placeholder data
        setStats({
          repos: 24,
          followers: 120,
          following: 45,
          contributions: 1200,
        })
      } finally {
        setLoading(false)
      }
    }

    if (GITHUB_USERNAME !== 'your-username') {
      fetchStats()
    } else {
      // Use placeholder data
      setStats({
        repos: 24,
        followers: 120,
        following: 45,
        contributions: 1200,
      })
      setLoading(false)
    }
  }, [])

  const statItems = [
    { label: 'Repositories', value: stats.repos, icon: '📦' },
    { label: 'Followers', value: stats.followers, icon: '👥' },
    { label: 'Following', value: stats.following, icon: '👤' },
    { label: 'Contributions', value: stats.contributions, icon: '⭐' },
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

        {GITHUB_USERNAME !== 'your-username' && (
          <motion.a
            href={`https://github.com/${GITHUB_USERNAME}`}
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
        )}
      </div>
    </section>
  )
}

export default GitHubStats
