import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function GoogleAd() {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log('🔍 GoogleAd: Component mounted, starting ad initialization...');

    try {
      // Check if AdSense script is already loaded
      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      console.log('🔍 GoogleAd: Checking existing AdSense script:', {
        exists: !!existingScript,
        src: existingScript?.getAttribute('src')
      });

      // Create and append the AdSense script if it doesn't exist
      if (!existingScript) {
        const script1 = document.createElement('script');
        script1.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024";
        script1.async = true;
        script1.crossOrigin = "anonymous";
        document.head.appendChild(script1);
        console.log('✅ GoogleAd: AdSense script added to document');

        script1.onload = () => {
          console.log('✅ GoogleAd: AdSense script loaded successfully');
          initializeAd();
        };

        script1.onerror = (error) => {
          console.error('❌ GoogleAd: Error loading AdSense script:', error);
        };
      } else {
        // If script already exists, initialize ad directly
        initializeAd();
      }

    } catch (error) {
      console.error('❌ GoogleAd: Critical error during initialization:', error);
    }

    function initializeAd() {
      // Wait a bit to ensure container is ready
      setTimeout(() => {
        if (adRef.current) {
          console.log('🔍 GoogleAd: Container ready, pushing ad...');
          try {
            // Initialize adsbygoogle if needed
            if (!window.adsbygoogle) {
              window.adsbygoogle = [];
            }
            
            // Push the ad
            window.adsbygoogle.push({});
            console.log('✅ GoogleAd: Ad push successful');

            // Monitor ad container
            const computedStyle = window.getComputedStyle(adRef.current);
            console.log('🔍 GoogleAd: Ad container status:', {
              width: computedStyle.width,
              height: computedStyle.height,
              display: computedStyle.display,
              visibility: computedStyle.visibility
            });
          } catch (error) {
            console.error('❌ GoogleAd: Error pushing ad:', error);
          }
        } else {
          console.error('❌ GoogleAd: Container not ready');
        }
      }, 100); // Small delay to ensure container is rendered
    }

    // Cleanup on unmount
    return () => {
      console.log('🔍 GoogleAd: Component unmounting...');
    };
  }, []);

  return (
    <div ref={adRef} className="w-full flex justify-center my-4">
      {/* Prueba1 */}
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