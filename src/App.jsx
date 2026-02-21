import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
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
import ResumePage from "./pages/ResumePage";
import "./App.css";

function HomePage() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

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
    <>
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
    </>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      <PageLoader isLoading={isLoading} />
      <SkipToContent />
      <EasterEggs />
      <CustomCursor />
      <ParticleBackground />
      <ScrollProgress />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume" element={<ResumePage />} />
      </Routes>

      {/* Background gradient effect */}
      <div className="bg-gradient" />
    </div>
  );
}

export default App;
