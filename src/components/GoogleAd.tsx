
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function GoogleAd() {
  const adContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize adsbygoogle if it doesn't exist
    if (!window.adsbygoogle) {
      window.adsbygoogle = [];
    }

    // Function to load and initialize the ad
    const loadAd = () => {
      try {
        console.log('Pushing ad to adsbygoogle');
        (window.adsbygoogle = window.adsbygoogle || []).push({});
        console.log('Ad push completed');
      } catch (error) {
        console.error('Error initializing ad:', error);
      }
    };

    // Check if AdSense script exists
    const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
    
    if (!existingScript) {
      // Create and append the script if it doesn't exist
      console.log('AdSense script not found, creating new script');
      const script = document.createElement('script');
      script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024";
      script.async = true;
      script.crossOrigin = "anonymous";
      
      script.onload = () => {
        console.log('AdSense script loaded successfully');
        loadAd();
      };
      
      script.onerror = (error) => {
        console.error('Error loading AdSense script:', error);
      };
      
      document.head.appendChild(script);
    } else {
      // If script already exists, just load the ad
      console.log('AdSense script already exists, loading ad directly');
      loadAd();
    }

    return () => {
      // Cleanup function (if needed)
      console.log('GoogleAd component unmounted');
    };
  }, []);

  return (
    <div ref={adContainerRef} className="w-full flex justify-center my-6">
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '728px',
          height: '90px'
        }}
        data-ad-client="ca-pub-8823992623303024"
        data-ad-slot="7080403920"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
