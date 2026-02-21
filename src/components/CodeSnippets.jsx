import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import './CodeSnippets.css'

const codeSnippets = [
  {
    id: 1,
    title: 'Factory Pattern - React.createElement',
    description: 'Encapsulates object creation, separating initialization from usage',
    language: 'jsx',
    code: `// JSX code
<div className="container">
  <h1>Hello World</h1>
</div>

// Gets compiled to:
React.createElement(
  'div',
  { className: 'container' },
  React.createElement('h1', null, 'Hello World')
);

// Factory Pattern Implementation
function createFormField(type, props) {
  const fieldMap = {
    input: () => <input {...props} />,
    textarea: () => <textarea {...props} />,
    select: () => <select {...props}>{props.children}</select>,
  };
  
  const factory = fieldMap[type];
  if (!factory) {
    throw new Error(\`Unknown field type: \${type}\`);
  }
  
  return factory();
}

// Usage: Dynamic form rendering
const formSchema = [
  { type: 'input', name: 'email', placeholder: 'Email' },
  { type: 'textarea', name: 'message', placeholder: 'Message' },
];

function DynamicForm({ schema }) {
  return (
    <form>
      {schema.map((field) => (
        <div key={field.name}>
          {createFormField(field.type, field)}
        </div>
      ))}
    </form>
  );
}`,
  },
  {
    id: 2,
    title: 'Singleton Pattern - Redux Store',
    description: 'Ensures a class has only one instance with global access point',
    language: 'javascript',
    code: `// Redux Store Singleton
import { createStore } from 'redux';

function rootReducer(state = {}, action) {
  switch (action.type) {
    case 'SET_DATA':
      return { ...state, data: action.payload };
    default:
      return state;
  }
}

// Single instance created and exported
const store = createStore(rootReducer);

export default store;

// Usage in components
import { useSelector, useDispatch } from 'react-redux';
import store from './store';

function MyComponent() {
  const data = useSelector((state) => state.data);
  const dispatch = useDispatch();
  
  const handleUpdate = () => {
    dispatch({ type: 'SET_DATA', payload: 'New Data' });
  };
  
  return (
    <div>
      <p>{data}</p>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

// Provider wraps app with singleton store
function App() {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
}`,
  },
  {
    id: 3,
    title: 'Observer Pattern - Event System',
    description: 'Defines a one-to-many dependency between objects',
    language: 'javascript',
    code: `// Observer Pattern - Event Emitter
class EventEmitter {
  constructor() {
    this.events = {};
  }
  
  on(event, callback) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(callback);
  }
  
  off(event, callback) {
    if (this.events[event]) {
      this.events[event] = this.events[event].filter(cb => cb !== callback);
    }
  }
  
  emit(event, data) {
    if (this.events[event]) {
      this.events[event].forEach(callback => callback(data));
    }
  }
}

// Usage in React
const eventEmitter = new EventEmitter();

function useEventEmitter() {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const handleDataChange = (newData) => {
      setData(newData);
    };
    
    eventEmitter.on('dataChange', handleDataChange);
    
    return () => {
      eventEmitter.off('dataChange', handleDataChange);
    };
  }, []);
  
  return { data, emit: eventEmitter.emit.bind(eventEmitter) };
}

// React Context as Observer Pattern
const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Components observe theme changes
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <button 
      onClick={toggleTheme}
      className={\`btn-\${theme}\`}
    >
      Current theme: {theme}
    </button>
  );
}`,
  },
  {
    id: 4,
    title: 'Decorator Pattern - Higher-Order Components',
    description: 'Allows adding new functionality to objects dynamically',
    language: 'jsx',
    code: `// Higher-Order Component (HOC) - Decorator Pattern
function withLoading(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [loading, setLoading] = useState(false);
    
    return (
      <>
        {loading && <div>Loading...</div>}
        <WrappedComponent {...props} setLoading={setLoading} />
      </>
    );
  };
}

function withErrorHandling(WrappedComponent) {
  return function EnhancedComponent(props) {
    const [error, setError] = useState(null);
    
    if (error) {
      return <div>Error: {error.message}</div>;
    }
    
    return (
      <WrappedComponent {...props} setError={setError} />
    );
  };
}

// Combining multiple decorators
const MyComponent = withErrorHandling(
  withLoading(({ setLoading, setError }) => {
    // Component logic
    return <div>My Component</div>;
  })
);

// Axios Request Decorator
function withLoading(axiosRequest) {
  return async function enhancedRequest(...args) {
    const loadingElement = document.getElementById('loading');
    loadingElement.style.display = 'block';
    
    try {
      const result = await axiosRequest(...args);
      return result;
    } finally {
      loadingElement.style.display = 'none';
    }
  };
}

// Usage
const axiosWithLoading = withLoading(axios.get);
await axiosWithLoading('/api/data');`,
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
            Design patterns and SOLID principles I apply in frontend development
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
