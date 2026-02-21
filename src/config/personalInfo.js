// Personal Information Configuration
// Update this file with your actual information

export const personalInfo = {
  // Basic Info
  name: "Nguyễn Thành Tài",
  title: "Software Engineer",
  location: "District 7, Ho Chi Minh City",
  email: "thanhtaiwork04@gmail.com",
  phone: "+84 328 329 908",

  // Social Links
  social: {
    github: "https://github.com/thvnhtai",
    linkedin: "https://linkedin.com/in/tai-nt",
    twitter: "", // No Twitter/X
    email: "mailto:thanhtaiwork04@gmail.com",
  },

  // Hero Section
  hero: {
    badge: "Software Engineer",
    title: "Building Modern",
    titleHighlight: "Digital Solutions",
    titleEnd: "With Impact",
    description:
      "Software Engineering student specializing in Frontend and Mobile development. Passionate about building modern web and mobile applications with React, Next.js, and React Native. Currently working at Grab with experience in Micro-frontend architecture, State Management, and Type-safe APIs.",
    stats: [
      { number: "8.51", label: "GPA / 10" },
      { number: "4+", label: "Projects Completed" },
      { number: "2", label: "Years Experience" },
    ],
  },

  // About Section
  about: {
    paragraphs: [
      "I'm a final-year Software Engineering student at the University of Information Technology (UIT - VNUHCM) with a GPA of 8.51/10. Currently working at Grab Holdings Limited as a Software Engineer, specializing in Frontend and Mobile development.",
      "With experience working with React, Next.js, React Native, and modern technologies like Module Federation, Zustand, and TanStack Query, I focus on building well-architected, type-safe, and high-performance applications. I also have experience with Backend (Go, GraphQL, MongoDB) and Mobile (React Native, Firebase).",
      "Beyond work, I'm passionate about exploring new technologies, participating in programming competitions, and contributing to open source projects. I won the Encouragement Award at SEAPP CONTEST 2024 and hold certifications in Agile Development, Product Management, and UX Design.",
    ],
    highlights: [
      {
        icon: "🚀",
        title: "Modern Tech Stack",
        description:
          "Specialized in React, Next.js, React Native with deep knowledge of Micro-frontend architecture, State Management, and Type-safe APIs",
      },
      {
        icon: "💼",
        title: "Industry Experience",
        description:
          "Working at Grab with experience building large-scale systems and enterprise applications",
      },
      {
        icon: "🎓",
        title: "Continuous Learning",
        description:
          "GPA 8.51/10, achieved Excellent grade in recent semester, and continuously learning new technologies",
      },
      {
        icon: "🏆",
        title: "Achievements",
        description:
          "Encouragement Award at SEAPP CONTEST 2024, certifications from IBM and Google, TOEIC 745",
      },
    ],
  },

  // Resume
  resume: {
    downloadUrl: "/resume.pdf", // Place your resume.pdf in public folder
    fileName: "Resume-NguyenThanhTai.pdf",
  },
};

// Email Service Configuration
export const emailConfig = {
  // EmailJS Configuration
  emailjs: {
    serviceId: "service_af5cqjq", // Get from EmailJS dashboard
    templateId: "template_ymzto0r", // Get from EmailJS dashboard
    publicKey: "aeQN2MowHva67rQ6O", // Get from Emailtemplate_ymzto0rJS dashboard
  },

  // Formspree Configuration (Alternative)
  formspree: {
    formId: "YOUR_FORM_ID", // Get from Formspree dashboard
  },

  // Use 'emailjs' or 'formspree'
  provider: "emailjs",
};

// Analytics Configuration
export const analyticsConfig = {
  // Google Analytics 4
  googleAnalytics: {
    measurementId: "G-XXXXXXXXXX", // Replace with your GA4 Measurement ID
    enabled: false, // Set to true after adding your Measurement ID
  },
};

// SEO Configuration
export const seoConfig = {
  siteName: "Nguyễn Thành Tài - Portfolio",
  siteUrl: "https://thvnhtai.app",
  defaultTitle: "Nguyễn Thành Tài - Software Engineer | Frontend & Mobile Developer",
  defaultDescription:
    "Software Engineer specializing in Frontend and Mobile development. UIT student with GPA 8.51/10, currently working at Grab. Expert in React, Next.js, React Native, and modern technologies.",
  defaultImage: "/og-image.png", // Create og-image.png (1200x630px) in public folder
  twitterHandle: "", // Can be added later if you have Twitter
};
