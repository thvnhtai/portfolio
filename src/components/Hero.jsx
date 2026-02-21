import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { personalInfo } from "../config/personalInfo";
import AnimatedCounter from "./AnimatedCounter";
import ResumeViewer from "./ResumeViewer";
import "./Hero.css";

function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

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
  };

  return (
    <section id="hero" className="hero">
      <motion.div
        className="cursor-follower"
        animate={{
          x: mousePosition.x - 300,
          y: mousePosition.y - 300,
        }}
        transition={{ type: "spring", stiffness: 50, damping: 20 }}
      />

      <div className="hero-container">
        <motion.div
          className="hero-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="hero-badge" variants={itemVariants}>
            <span className="badge-text">{personalInfo.hero.badge}</span>
          </motion.div>

          <motion.h1 className="hero-title" variants={itemVariants}>
            {personalInfo.hero.title}
            <br />
            <span className="gradient-text">
              <TypeAnimation
                sequence={[
                  personalInfo.hero.titleHighlight,
                  2000,
                  "Creative Developer",
                  2000,
                  "Problem Solver",
                  2000,
                  personalInfo.hero.titleHighlight,
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                cursor={true}
              />
            </span>
            <br />
            {personalInfo.hero.titleEnd}
          </motion.h1>

          <motion.p className="hero-description" variants={itemVariants}>
            {personalInfo.hero.description}
            {personalInfo.resume.downloadUrl && (
              <>
                {' '}
                <ResumeViewer
                  resumeUrl={personalInfo.resume.downloadUrl}
                  fileName={personalInfo.resume.fileName}
                />
              </>
            )}
          </motion.p>

          <motion.div className="hero-actions" variants={itemVariants}>
            <motion.a
              href="#projects"
              className="btn btn-primary btn-large"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              View My Work
            </motion.a>
            <motion.a
              href="#contact"
              className="btn btn-secondary"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Get In Touch
            </motion.a>
          </motion.div>

          <motion.div className="hero-stats" variants={itemVariants}>
            {personalInfo.hero.stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">
                  <AnimatedCounter value={stat.number} />
                </div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <div className="code-window">
            <div className="code-window-header">
              <div className="code-dot"></div>
              <div className="code-dot"></div>
              <div className="code-dot"></div>
            </div>
            <div className="code-content">
              <pre>
                <code>
                  {`const engineer = {
  name: 'Nguyễn Thành Tài',
  role: 'Software Engineer @ Grab',
  skills: ['React', 'Next.js', 'React Native'],
  expertise: ['Micro-frontend', 'State Management', 'Type-safe APIs'],
  passion: 'Building modern web & mobile apps',
  approach: 'Type-safe & Performance-focused'
};

function create() {
  return <ModernDigitalSolutions />;
}`}
                </code>
              </pre>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span>Scroll</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M7 10L12 15L17 10"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
    </section>
  );
}

export default Hero;
