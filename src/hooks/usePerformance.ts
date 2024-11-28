import { useEffect, useCallback } from 'react';
import { captureWebVitals, PerformanceMetrics } from '../utils/performance/metrics';
import { checkImageFormat } from '../utils/performance/imageOptimizer';

export function usePerformance() {
  useEffect(() => {
    // Initialize performance monitoring
    captureWebVitals().then((metrics) => {
      // Report metrics to analytics
      if (window.gtag) {
        Object.entries(metrics).forEach(([metric, value]) => {
          window.gtag('event', 'web_vitals', {
            metric_name: metric,
            metric_value: value,
            metric_delta: value
          });
        });
      }
    });

    // Check and optimize images
    checkImageFormat().then(formats => {
      // Store supported formats for optimal image delivery
      sessionStorage.setItem('supported_image_formats', JSON.stringify(formats));
    });
  }, []);

  const measureInteraction = useCallback(async (name: string) => {
    const start = performance.now();
    
    return {
      end: () => {
        const duration = performance.now() - start;
        if (window.gtag) {
          window.gtag('event', 'user_interaction', {
            interaction_name: name,
            duration_ms: duration
          });
        }
        return duration;
      }
    };
  }, []);

  return {
    measureInteraction
  };
}