// Analytics utility functions
import { analyticsConfig } from '../config/personalInfo'

// Initialize Google Analytics
export const initAnalytics = () => {
  if (analyticsConfig.googleAnalytics.enabled && analyticsConfig.googleAnalytics.measurementId !== 'G-XXXXXXXXXX') {
    // GA4 is loaded via script tag in index.html
    // This function can be used for additional setup if needed
    if (typeof window !== 'undefined' && window.gtag) {
      console.log('Google Analytics initialized')
    }
  }
}

// Track page view
export const trackPageView = (path) => {
  if (analyticsConfig.googleAnalytics.enabled && typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', analyticsConfig.googleAnalytics.measurementId, {
      page_path: path,
    })
  }
}

// Track custom events
export const trackEvent = (eventName, eventParams = {}) => {
  if (analyticsConfig.googleAnalytics.enabled && typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, eventParams)
  }
}

// Track form submissions
export const trackFormSubmit = (formName) => {
  trackEvent('form_submit', {
    form_name: formName,
  })
}

// Track project views
export const trackProjectView = (projectName) => {
  trackEvent('project_view', {
    project_name: projectName,
  })
}

// Track resume downloads
export const trackResumeDownload = () => {
  trackEvent('resume_download', {
    content_type: 'resume',
  })
}
