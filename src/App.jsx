import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PageLoader from "./components/PageLoader";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Testimonials from "./components/Testimonials";
import CodeSnippets from "./components/CodeSnippets";
import GitHubStats from "./components/GitHubStats";
import Blog from "./components/Blog";
import Contact from "./components/Contact";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";
import EasterEggs from "./components/EasterEggs";
import SkipToContent from "./components/SkipToContent";
import "./App.css";

function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll position
      const sections = [
        "hero",
        "about",
        "skills",
        "projects",
        "experience",
        "testimonials",
        "code-snippets",
        "github-stats",
        "blog",
        "contact",
      ];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="app">
      <PageLoader isLoading={isLoading} />
      <SkipToContent />
      <EasterEggs />
      <CustomCursor />
      <ParticleBackground />
      <ScrollProgress />
      <Navigation activeSection={activeSection} scrollY={scrollY} />

      <main tabIndex={-1}>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Testimonials />
        <CodeSnippets />
        <GitHubStats />
        <Blog />
        <Contact />
      </main>

      {/* Background gradient effect */}
      <div className="bg-gradient" />

      {/* Cursor trail effect */}
      <motion.div
        className="cursor-trail"
        animate={{
          scale: scrollY > 100 ? 0 : 1,
          opacity: scrollY > 100 ? 0 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
}

export default App;
