import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function GoogleAd() {
  useEffect(() => {
    console.log('🔍 GoogleAd: Component mounted, starting ad initialization...');

    try {
      // Check if AdSense script is already loaded
      const existingScript = document.querySelector('script[src*="adsbygoogle.js"]');
      console.log('🔍 GoogleAd: Checking existing AdSense script:', {
        exists: !!existingScript,
        src: existingScript?.getAttribute('src')
      });

      // Create and append the AdSense script
      const script1 = document.createElement('script');
      script1.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024";
      script1.async = true;
      script1.crossOrigin = "anonymous";
      document.body.appendChild(script1);
      console.log('✅ GoogleAd: AdSense script added to document');

      // Log window.adsbygoogle status
      console.log('🔍 GoogleAd: Current adsbygoogle status:', {
        isDefined: typeof window.adsbygoogle !== 'undefined',
        isArray: Array.isArray(window.adsbygoogle),
        length: window.adsbygoogle?.length
      });

      // Create and append the ad push script
      const script2 = document.createElement('script');
      script2.text = '(adsbygoogle = window.adsbygoogle || []).push({});';
      document.body.appendChild(script2);
      console.log('✅ GoogleAd: Ad push script added');

      // Add event listeners to monitor script loading
      script1.onload = () => {
        console.log('✅ GoogleAd: AdSense script loaded successfully');
      };

      script1.onerror = (error) => {
        console.error('❌ GoogleAd: Error loading AdSense script:', error);
      };

      // Monitor ad container after a delay
      setTimeout(() => {
        const adContainer = document.querySelector('.adsbygoogle');
        const computedStyle = adContainer ? window.getComputedStyle(adContainer) : null;
        
        console.log('🔍 GoogleAd: Checking ad container status:', {
          exists: !!adContainer,
          width: computedStyle?.width,
          height: computedStyle?.height,
          display: computedStyle?.display,
          visibility: computedStyle?.visibility,
          innerHTML: adContainer?.innerHTML?.length || 0
        });
      }, 2000);

    } catch (error) {
      console.error('❌ GoogleAd: Critical error during initialization:', error);
    }

    // Cleanup on unmount
    return () => {
      console.log('🔍 GoogleAd: Component unmounting, cleaning up scripts...');
      try {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.src.includes('adsbygoogle.js') || script.text.includes('adsbygoogle.push')) {
            script.remove();
            console.log('✅ GoogleAd: Removed script:', script.src || script.text.substring(0, 50));
          }
        });
      } catch (error) {
        console.error('❌ GoogleAd: Error during cleanup:', error);
      }
    };
  }, []);

  console.log('🔄 GoogleAd: Rendering ad container');
  return (
    <div 
      className="w-full flex justify-center my-4" 
      style={{ minWidth: '300px', maxWidth: '970px', margin: '0 auto' }}
    >
      {/* Prueba1 */}
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          minHeight: '280px',
          backgroundColor: '#f8f9fa'
        }}
        data-ad-client="ca-pub-8823992623303024"
        data-ad-slot="7080403920"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
} 