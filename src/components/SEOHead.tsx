import { useEffect } from 'react';

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  canonical?: string;
}

const SEOHead = ({ 
  title, 
  description, 
  keywords = "complaint management, anonymous feedback, educational institutions, feedback system",
  ogType = "website",
  canonical
}: SEOHeadProps) => {
  useEffect(() => {
    // Update title
    document.title = `${title} | TellUs`;
    
    // Update or create meta tags
    const updateMetaTag = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };
    
    // Standard meta tags
    updateMetaTag('description', description);
    updateMetaTag('keywords', keywords);
    
    // Open Graph tags
    updateMetaTag('og:title', `${title} | TellUs`, true);
    updateMetaTag('og:description', description, true);
    updateMetaTag('og:type', ogType, true);
    
    // Twitter Card tags
    updateMetaTag('twitter:title', `${title} | TellUs`);
    updateMetaTag('twitter:description', description);
    
    // Canonical URL
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]');
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonical);
    }
  }, [title, description, keywords, ogType, canonical]);

  return null;
};

export default SEOHead;
