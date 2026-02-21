import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./ResumeViewer.css";

function ResumeViewer() {
  return (
    <Link to="/resume" className="btn-view-resume-inline">
      <motion.span
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        View Resume
      </motion.span>
    </Link>
  );
}

export default ResumeViewer;
