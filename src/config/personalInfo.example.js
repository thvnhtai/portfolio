// Example Configuration File
// Copy this file to personalInfo.js and fill in your actual values

export const personalInfo = {
  // Basic Info
  name: 'Your Name',
  title: 'Senior Frontend Engineer',
  location: 'Your Location',
  email: 'your.email@example.com',
  
  // Social Links
  social: {
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
    twitter: 'https://twitter.com/yourusername',
    email: 'mailto:your.email@example.com',
  },
  
  // Hero Section
  hero: {
    badge: 'Senior Frontend Engineer',
    title: 'Building Digital',
    titleHighlight: 'Experiences',
    titleEnd: 'That Matter',
    description: 'I specialize in building modern web applications with a focus on performance, accessibility, and exceptional user experience.',
    stats: [
      { number: '5+', label: 'Years of Experience' },
      { number: '50+', label: 'Projects Completed' },
      { number: '100%', label: 'Client Satisfaction' },
    ],
  },
  
  // About Section
  about: {
    paragraphs: [
      "I'm a Senior Frontend Engineer with over 5 years of experience building modern and scalable web applications. I'm passionate about creating exceptional user experiences through clean code, solid architecture, and attention to detail.",
      "With a strong background in the React ecosystem, TypeScript, and modern web technologies, I focus on building high-performance, accessible, and maintainable applications. I also have experience mentoring junior developers and collaborating with cross-functional teams.",
      "Beyond coding, I enjoy exploring new technologies, contributing to open source projects, and sharing knowledge through technical blogs and talks.",
    ],
    highlights: [
      {
        icon: '🎯',
        title: 'User-Centric',
        description: 'Always putting user experience at the center of every design and development decision',
      },
      {
        icon: '⚡',
        title: 'Performance First',
        description: 'Optimizing performance from code level to architecture level to ensure smooth experiences',
      },
      {
        icon: '🔧',
        title: 'Clean Code',
        description: 'Writing maintainable, testable, and scalable code with best practices and design patterns',
      },
      {
        icon: '🤝',
        title: 'Collaboration',
        description: 'Working effectively with teams, mentoring developers, and contributing to team growth',
      },
    ],
  },
  
  // Resume
  resume: {
    downloadUrl: '/resume.pdf', // Place your resume.pdf in public folder
    fileName: 'Resume-YourName.pdf',
  },
}

// Email Service Configuration
export const emailConfig = {
  // EmailJS Configuration
  emailjs: {
    serviceId: 'service_abc123', // ⬅️ REPLACE: Get from EmailJS dashboard → Email Services
    templateId: 'template_xyz789', // ⬅️ REPLACE: Get from EmailJS dashboard → Email Templates
    publicKey: 'abcdefghijklmnop', // ⬅️ REPLACE: Get from EmailJS dashboard → Account → General
  },
  
  // Formspree Configuration (Alternative)
  formspree: {
    formId: 'xvgwqkny', // ⬅️ REPLACE: Get from Formspree dashboard → Forms
  },
  
  // Use 'emailjs' or 'formspree'
  provider: 'emailjs', // ⬅️ CHANGE: 'emailjs' or 'formspree'
}

// Analytics Configuration
export const analyticsConfig = {
  // Google Analytics 4
  googleAnalytics: {
    measurementId: 'G-XXXXXXXXXX', // ⬅️ REPLACE: Get from Google Analytics dashboard
    enabled: false, // ⬅️ CHANGE: Set to true after adding Measurement ID
  },
}

// SEO Configuration
export const seoConfig = {
  siteName: 'Your Name - Portfolio',
  siteUrl: 'https://thvnhtai.app',
  defaultTitle: 'Your Name - Senior Frontend Engineer',
  defaultDescription: 'Senior Frontend Engineer specializing in React, TypeScript, and modern web technologies. Building exceptional digital experiences.',
  defaultImage: '/og-image.png', // Create og-image.png (1200x630px) in public folder
  twitterHandle: '@yourusername',
}
