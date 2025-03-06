
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function GoogleAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      // Only proceed if we're in the browser environment
      if (typeof window === 'undefined') return;

      // Initialize adsbygoogle if it doesn't exist
      window.adsbygoogle = window.adsbygoogle || [];

      // Load the AdSense script if it's not already loaded
      const loadAdScript = () => {
        if (!document.querySelector('script[src*="adsbygoogle.js"]')) {
          const script = document.createElement('script');
          script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024";
          script.async = true;
          script.crossOrigin = "anonymous";
          document.head.appendChild(script);
          console.log('AdSense script added to document head');
          return new Promise((resolve) => {
            script.onload = resolve;
          });
        }
        return Promise.resolve();
      };

      // Function to initialize the ad
      const initializeAd = () => {
        // Ensure the ref is available
        if (adRef.current) {
          // Clear any previous ad content
          while (adRef.current.firstChild) {
            adRef.current.removeChild(adRef.current.firstChild);
          }

          // Create the ins element
          const ins = document.createElement('ins');
          ins.className = 'adsbygoogle';
          ins.style.display = 'block';
          ins.style.width = '100%';
          ins.style.height = 'auto';
          ins.setAttribute('data-ad-client', 'ca-pub-8823992623303024');
          ins.setAttribute('data-ad-slot', '7080403920');
          ins.setAttribute('data-ad-format', 'auto');
          ins.setAttribute('data-full-width-responsive', 'true');
          
          // Append the ins element to our container
          adRef.current.appendChild(ins);
          
          // Push the ad to Google AdSense
          try {
            console.log('Pushing ad to adsbygoogle');
            (window.adsbygoogle = window.adsbygoogle || []).push({});
            console.log('Ad push completed');
          } catch (error) {
            console.error('Error pushing ad:', error);
          }
        }
      };

      // Main execution
      loadAdScript().then(() => {
        console.log('AdSense script loaded, initializing ad');
        setTimeout(() => {
          initializeAd();
        }, 100); // Small delay to ensure script is properly loaded
      });

    } catch (error) {
      console.error('Error in GoogleAd component:', error);
    }

    return () => {
      // Cleanup function if needed
      console.log('GoogleAd component unmounted');
    };
  }, []);

  return (
    <div 
      ref={adRef} 
      className="w-full my-6 min-h-[90px] bg-gray-50"
      style={{ minHeight: '90px' }}
    />
  );
}
