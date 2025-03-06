import React, { useEffect } from 'react';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

export function GoogleAd() {
  useEffect(() => {
    // Create and append the AdSense script
    const script1 = document.createElement('script');
    script1.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8823992623303024";
    script1.async = true;
    script1.crossOrigin = "anonymous";
    document.body.appendChild(script1);

    // Create and append the ad push script
    const script2 = document.createElement('script');
    script2.text = '(adsbygoogle = window.adsbygoogle || []).push({});';
    document.body.appendChild(script2);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <div className="w-full flex justify-center my-4" style={{ minWidth: '300px', maxWidth: '970px', margin: '0 auto' }}>
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