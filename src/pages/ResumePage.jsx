import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import { personalInfo } from "../config/personalInfo";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import "./ResumePage.css";

// Set up PDF.js worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

function ResumePage() {
  const navigate = useNavigate();
  const resumeUrl = personalInfo.resume.downloadUrl;
  const fileName = personalInfo.resume.fileName;
  
  const [numPages, setNumPages] = useState(null);
  const [scale, setScale] = useState(1.5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(null);
    if (isMobile) {
      setScale(1.0);
    }
  };

  const onDocumentLoadError = (error) => {
    console.error("Error loading PDF:", error);
    setError("Failed to load PDF. Please try downloading instead.");
    setLoading(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = fileName || "resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const zoomIn = () => {
    setScale((prev) => Math.min(3, prev + 0.25));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(0.5, prev - 0.25));
  };

  const resetZoom = () => {
    setScale(isMobile ? 1.0 : 1.5);
  };

  return (
    <div className="resume-page">
      <motion.div
        className="resume-page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="resume-page-container">
          <button
            className="back-button"
            onClick={() => navigate(-1)}
            aria-label="Go back"
          >
            ← Back
          </button>
          
          <h1 className="resume-page-title">Resume</h1>
          
          <div className="resume-page-controls">
            {numPages && (
              <div className="page-info-display">
                <span className="page-info">
                  {numPages} {numPages === 1 ? 'Page' : 'Pages'}
                </span>
              </div>
            )}
            <div className="zoom-controls">
              <button
                className="control-btn"
                onClick={zoomOut}
                disabled={scale <= 0.5}
                aria-label="Zoom out"
              >
                −
              </button>
              <span className="zoom-info">
                {Math.round(scale * 100)}%
              </span>
              <button
                className="control-btn"
                onClick={zoomIn}
                disabled={scale >= 3}
                aria-label="Zoom in"
              >
                +
              </button>
              <button
                className="control-btn"
                onClick={resetZoom}
                aria-label="Reset zoom"
              >
                ⟲
              </button>
            </div>
            <button
              className="control-btn download-btn"
              onClick={handleDownload}
              aria-label="Download resume"
            >
              <span className="download-icon">⬇</span>
              <span className="download-text">Download</span>
            </button>
          </div>
        </div>
      </motion.div>

      <motion.div
        className="resume-page-body"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {error ? (
          <div className="pdf-error">
            <p>{error}</p>
            <button
              className="btn btn-primary"
              onClick={handleDownload}
            >
              Download Resume Instead
            </button>
          </div>
        ) : (
          <div className="pdf-container">
            <Document
              file={resumeUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={
                <div className="pdf-loading">
                  <div className="loading-spinner" />
                  <p>Loading PDF...</p>
                </div>
              }
              error={
                <div className="pdf-error">
                  <p>Failed to load PDF. Please try downloading instead.</p>
                  <button
                    className="btn btn-primary"
                    onClick={handleDownload}
                  >
                    Download Resume Instead
                  </button>
                </div>
              }
              options={{
                cMapUrl: `https://unpkg.com/pdfjs-dist@5.4.296/cmaps/`,
                cMapPacked: true,
                standardFontDataUrl: `https://unpkg.com/pdfjs-dist@5.4.296/standard_fonts/`,
              }}
            >
              {numPages && Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  scale={scale}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  className="pdf-page"
                />
              ))}
            </Document>
          </div>
        )}
      </motion.div>
    </div>
  );
}

export default ResumePage;
