import React, { useEffect, useRef, useState } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface GoogleAdProps {
  refreshKey?: string | number;
}

export function GoogleAd({ refreshKey }: GoogleAdProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const loadAd = async () => {
      try {
        // Reset error state
        setAdError(false);

        // Check if adsbygoogle is blocked
        if (typeof window.adsbygoogle === 'undefined') {
          const error = new Error('AdSense not loaded - possibly blocked');
          console.log('Google AdSense Error:', {
            type: 'Initialization Error',
            message: error.message,
            timestamp: new Date().toISOString(),
            adsbygoogleStatus: 'undefined'
          });
          throw error;
        }

        // Initialize adsbygoogle if needed
        if (!window.adsbygoogle) {
          window.adsbygoogle = [];
          console.log('Google AdSense Info:', {
            type: 'Initialization',
            message: 'Initialized empty adsbygoogle array',
            timestamp: new Date().toISOString()
          });
        }

        // Push the ad
        window.adsbygoogle.push({});
        console.log('Google AdSense Info:', {
          type: 'Ad Push',
          message: 'Attempted to push new ad',
          timestamp: new Date().toISOString()
        });

        // Set a timeout to check if ad loaded
        timeoutId = setTimeout(() => {
          const adIns = adRef.current?.querySelector('ins');
          const adStatus = adIns?.getAttribute('data-ad-status');
          
          if (!adIns || !adStatus) {
            console.log('Google AdSense Error:', {
              type: 'Loading Timeout',
              message: 'Ad failed to load within timeout period',
              timestamp: new Date().toISOString(),
              elementExists: !!adIns,
              adStatus: adStatus || 'none',
              htmlContent: adIns?.innerHTML || 'empty'
            });
            setAdError(true);
          } else {
            console.log('Google AdSense Success:', {
              type: 'Ad Loaded',
              message: 'Ad loaded successfully',
              timestamp: new Date().toISOString(),
              adStatus: adStatus
            });
          }
        }, 3000); // Wait 3 seconds to check ad status
      } catch (error) {
        console.log('Google AdSense Critical Error:', {
          type: 'Exception',
          message: error instanceof Error ? error.message : 'Unknown error',
          stack: error instanceof Error ? error.stack : undefined,
          timestamp: new Date().toISOString()
        });
        setAdError(true);
      }
    };

    loadAd();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [refreshKey]);

  if (adError) {
    return (
      <div className="w-full my-4">
        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center justify-center text-red-800">
            <svg 
              className="w-5 h-5 mr-2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <span className="font-medium">Error loading advertisement</span>
          </div>
          <p className="mt-2 text-sm text-red-700 text-center">
            Please disable your ad blocker to support us and ensure all features work correctly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={adRef} className="w-full flex justify-center my-4">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', height: 'auto', minHeight: '280px' }}
        data-ad-client="ca-pub-8823992623303024"
        data-ad-slot="7080403920"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
} 