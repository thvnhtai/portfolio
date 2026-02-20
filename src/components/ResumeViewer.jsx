import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Document, Page, pdfjs } from "react-pdf";
import "./ResumeViewer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeViewer({ resumeUrl, fileName }) {
  const [isOpen, setIsOpen] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  // Detect mobile on mount and resize
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
    // Auto-adjust scale for mobile
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

  const goToPrevPage = () => {
    setPageNumber((prev) => Math.max(1, prev - 1));
  };

  const goToNextPage = () => {
    setPageNumber((prev) => Math.min(numPages, prev + 1));
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

  const handleOpen = () => {
    setIsOpen(true);
    // Reset to first page when opening
    setPageNumber(1);
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  };

  const handleClose = () => {
    setIsOpen(false);
    // Restore body scroll
    document.body.style.overflow = '';
  };

  return (
    <>
      <motion.button
        className="btn-view-resume-inline"
        onClick={handleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="View resume"
      >
        View Resume
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="resume-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className="resume-modal"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="resume-modal-header">
                <h2 className="resume-modal-title">Resume</h2>
                <div className="resume-modal-controls">
                  {numPages && (
                    <div className="page-controls">
                      <button
                        className="control-btn"
                        onClick={goToPrevPage}
                        disabled={pageNumber <= 1}
                        aria-label="Previous page"
                      >
                        ←
                      </button>
                      <span className="page-info">
                        Page {pageNumber} of {numPages}
                      </span>
                      <button
                        className="control-btn"
                        onClick={goToNextPage}
                        disabled={pageNumber >= numPages}
                        aria-label="Next page"
                      >
                        →
                      </button>
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
                  <button
                    className="control-btn close-btn"
                    onClick={handleClose}
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              <div className="resume-modal-body">
                {loading && (
                  <div className="pdf-loading">
                    <div className="loading-spinner" />
                    <p>Loading PDF...</p>
                  </div>
                )}
                {error && (
                  <div className="pdf-error">
                    <p>{error}</p>
                    <button
                      className="btn btn-primary"
                      onClick={handleDownload}
                    >
                      Download Resume Instead
                    </button>
                  </div>
                )}
                {!error && (
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
                    >
                      <Page
                        pageNumber={pageNumber}
                        scale={scale}
                        renderTextLayer={true}
                        renderAnnotationLayer={true}
                        className="pdf-page"
                      />
                    </Document>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default ResumeViewer;
