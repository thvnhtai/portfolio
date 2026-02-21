import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Testimonials.css";

const testimonials = [
  {
    id: 1,
    name: "Thang Nguyen Quoc",
    role: "Software Engineer | UIT K17",
    company: "",
    content:
      "I have had the pleasure of studying and working alongside Nguyen Thanh Tai throughout our university years. As a Front-End Developer, he has consistently demonstrated strong technical expertise, creativity, and a passion for learning. With proficiency in Next.js, React.js, MUI, TailwindCSS, Redux, and many other front-end technologies, he has proven to be a highly capable developer. We have collaborated on multiple group projects where both of us took on key Front-End roles, and throughout these experiences, I have seen firsthand his strong problem-solving skills, adaptability, and eagerness to learn. Beyond his technical skills, he is fun-loving, friendly, and a great team player, yet remains highly focused and professional when it comes to his work. His ability to balance creativity and structure makes him a valuable asset in any development team. If you're looking for a talented and dedicated Front-End Developer who thrives in a collaborative environment, Nguyen Thanh Tai is someone I highly recommend!",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5635AQF95DAc0vsTWA/profile-framedphoto-shrink_100_100/profile-framedphoto-shrink_100_100/0/1738995602746?e=1772175600&v=beta&t=t3m8mmVeyVU1gj8Vdujg4evhOjGUENtyJA21nDLzUmY",
    rating: 5,
  },
  {
    id: 2,
    name: "Gia Bao Huynh",
    role: "Full-Stack Developer @ Golden Owl Solutions | Software Engineer @ UIT",
    company: "",
    content:
      "It has been a privilege to work with Nguyen Thanh Tai on various projects and competitions, including Web3 Hackfest and SEAPP Contest 2024. He is a skilled developer with a strong background in frontend development, mobile apps, and UI/UX design. His expertise in HTML, CSS, React, and Next.js allows him to build smooth, high-performing applications that are both visually appealing and highly functional. In his role as the frontend lead for the NFT-Based Notarization Platform, he played a key part in designing a seamless user interface while integrating NFT and blockchain technology for secure document verification. His work on AI-powered e-commerce solutions during SEAPP Contest 2024 showed his ability to merge advanced technology with user-centered design, ensuring an intuitive and engaging experience. His deep understanding of modern frontend frameworks helped bring these projects to life effectively. Tai's ability to think critically, adapt to challenges, and continuously innovate makes him an asset to any team. His blend of technical expertise and creative problem-solving ensures that he can contribute meaningfully to any project. I have no doubt that he will thrive in any role that values both skill and forward-thinking ideas.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQFVq_xpiWkQUg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1730739699435?e=1773273600&v=beta&t=LF0hFvG6DgA0YcBc3PVTRxzz9S9FwOWq-oZDtxOj-fg",
    rating: 5,
  },
  {
    id: 3,
    name: "Vinh Phuc Truong Le",
    role: "AI Product Engineer | DevOps Engineer",
    company: "",
    content:
      "Working with Thanh Tai on several initiatives and contests-including Web3 Hackfest and SEAPP Contest 2024 - has been an honor. Tai is a remarkable developer with great frontend, mobile, and UI/UX frontend experience. Designed and created a flawless user interface while combining NFT and blockchain technologies for safe document verification as the front-end leader for the NFT-based notarization Platform. His contributions to AI-driven e-commerce solutions in SEAPP Contest 2024 demonstrated his ability to combine user-centric design with innovative technology. Tai is a great value to any team because of his ability to solve problems, flexibility, and love of invention. For any job requiring technical mastery, imagination, and leadership, I heartily suggest him.",
    avatar:
      "https://media.licdn.com/dms/image/v2/D5603AQFmaW07KYXQjA/profile-displayphoto-scale_100_100/B56ZmBhD7KG4Ac-/0/1758814552476?e=1773273600&v=beta&t=-8UyeZFCkiizDxWmIAVS-_4stYkzYYNyq6Jy-LhZ8iU",
    rating: 5,
  },
];

function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section id="testimonials" className="testimonials">
      <div className="section-container">
        <motion.div
          className="section-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What People Say</h2>
        </motion.div>

        <div className="testimonials-carousel">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="testimonial-card"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <div className="testimonial-rating">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <span key={i} className="star">
                    ⭐
                  </span>
                ))}
              </div>
              <p className="testimonial-content">
                "{testimonials[currentIndex].content}"
              </p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  <img
                    src={testimonials[currentIndex].avatar}
                    alt={testimonials[currentIndex].name}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.textContent = "👤";
                    }}
                  />
                </div>
                <div className="testimonial-info">
                  <h3 className="testimonial-name">
                    {testimonials[currentIndex].name}
                  </h3>
                  <p className="testimonial-role">
                    {testimonials[currentIndex].role}
                    {testimonials[currentIndex].company &&
                      ` at ${testimonials[currentIndex].company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="carousel-controls">
            <button
              className="carousel-btn"
              onClick={goToPrev}
              aria-label="Previous"
            >
              ←
            </button>
            <div className="carousel-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`carousel-dot ${index === currentIndex ? "active" : ""}`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
            <button
              className="carousel-btn"
              onClick={goToNext}
              aria-label="Next"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
