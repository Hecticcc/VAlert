import { memo, useEffect } from 'react';

export const GoogleAnalytics = memo(function GoogleAnalytics() {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || [];
    
    // Initialize Google Analytics
    function gtag(type: string, ...args: any[]) {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    // Configure GA
    window.gtag('js', new Date());
    window.gtag('config', 'G-T14EWMW1PK');
  }, []);

  return (
    <>
      <script 
        async 
        src="https://www.googletagmanager.com/gtag/js?id=G-T14EWMW1PK"
      />
    </>
  );
});