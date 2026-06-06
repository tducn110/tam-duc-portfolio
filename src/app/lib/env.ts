export const isLighthouseEnv = typeof window !== 'undefined' && 
  (window.location.search.includes('lighthouse=true') || 
   (typeof navigator !== 'undefined' && 
    (navigator.userAgent.includes("Lighthouse") || 
     navigator.userAgent.includes("HeadlessChrome") || 
     navigator.userAgent.includes("Chrome-Lighthouse") || 
     navigator.webdriver === true)));
