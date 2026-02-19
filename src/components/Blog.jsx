import { motion } from 'framer-motion'
import './Blog.css'

// Note: Replace with your actual blog articles
const articles = [
  {
    id: 1,
    title: 'Building Scalable React Applications',
    excerpt: 'Learn how to structure React applications for scalability and maintainability.',
    date: '2024-01-15',
    readTime: '5 min read',
    category: 'React',
    url: 'https://medium.com/@yourusername/article1',
    image: '📚',
  },
  {
    id: 2,
    title: 'TypeScript Best Practices for Frontend',
    excerpt: 'Essential TypeScript patterns and practices for modern frontend development.',
    date: '2024-01-10',
    readTime: '7 min read',
    category: 'TypeScript',
    url: 'https://dev.to/yourusername/article2',
    image: '💻',
  },
  {
    id: 3,
    title: 'Performance Optimization Techniques',
    excerpt: 'Tips and tricks to optimize web application performance.',
    date: '2024-01-05',
    readTime: '6 min read',
    category: 'Performance',
    url: 'https://yourblog.com/article3',
    image: '⚡',
  },
]

function Blog() {
  return (
    <section id="blog" className="blog">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Blog</span>
          <h2 className="section-title">Latest Articles</h2>
          <p className="section-description">
            Sharing knowledge and insights about frontend development
          </p>
        </motion.div>

        <div className="articles-grid">
          {articles.map((article, index) => (
            <motion.article
              key={article.id}
              className="article-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="article-image">{article.image}</div>
              <div className="article-content">
                <div className="article-meta">
                  <span className="article-category">{article.category}</span>
                  <span className="article-date">{article.date}</span>
                </div>
                <h3 className="article-title">{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>
                <div className="article-footer">
                  <span className="article-read-time">{article.readTime}</span>
                  <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="article-link"
                  >
                    Read More →
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Blog
