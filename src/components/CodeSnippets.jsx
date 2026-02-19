import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import './CodeSnippets.css'

const codeSnippets = [
  {
    id: 1,
    title: 'Custom Hook - useDebounce',
    description: 'A reusable debounce hook for optimizing API calls',
    language: 'javascript',
    code: `import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;`,
  },
  {
    id: 2,
    title: 'React Component - Animated Card',
    description: 'A card component with smooth animations using Framer Motion',
    language: 'jsx',
    code: `import { motion } from 'framer-motion';

function AnimatedCard({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      className="card"
    >
      {children}
    </motion.div>
  );
}

export default AnimatedCard;`,
  },
  {
    id: 3,
    title: 'Utility Function - Format Date',
    description: 'A utility function to format dates in a readable format',
    language: 'javascript',
    code: `function formatDate(date, format = 'long') {
  const options = {
    year: 'numeric',
    month: format === 'short' ? 'short' : 'long',
    day: 'numeric',
  };
  
  return new Intl.DateTimeFormat('en-US', options).format(date);
}

export default formatDate;`,
  },
]

function CodeSnippets() {
  const [selectedSnippet, setSelectedSnippet] = useState(0)
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (code) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <section id="code-snippets" className="code-snippets">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Code</span>
          <h2 className="section-title">Code Snippets</h2>
          <p className="section-description">
            Some useful code snippets and utilities I've created
          </p>
        </motion.div>

        <div className="snippets-container">
          <div className="snippets-list">
            {codeSnippets.map((snippet, index) => (
              <motion.button
                key={snippet.id}
                className={`snippet-tab ${selectedSnippet === index ? 'active' : ''}`}
                onClick={() => setSelectedSnippet(index)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="snippet-title">{snippet.title}</span>
                <span className="snippet-description">{snippet.description}</span>
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSnippet}
              className="snippet-display"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="snippet-header">
                <div className="snippet-info">
                  <h3 className="snippet-display-title">
                    {codeSnippets[selectedSnippet].title}
                  </h3>
                  <span className="snippet-language">
                    {codeSnippets[selectedSnippet].language}
                  </span>
                </div>
                <button
                  className="copy-button"
                  onClick={() => copyToClipboard(codeSnippets[selectedSnippet].code)}
                  aria-label="Copy code"
                >
                  {copied ? '✓ Copied!' : '📋 Copy'}
                </button>
              </div>
              <div className="snippet-code">
                <SyntaxHighlighter
                  language={codeSnippets[selectedSnippet].language}
                  style={vscDarkPlus}
                  customStyle={{
                    margin: 0,
                    borderRadius: '8px',
                    padding: 'var(--spacing-lg)',
                  }}
                >
                  {codeSnippets[selectedSnippet].code}
                </SyntaxHighlighter>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default CodeSnippets
