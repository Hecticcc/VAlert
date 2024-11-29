import { LayoutShiftEntry } from '../../types/performance';
import { PerformanceMetrics } from '../../types/metrics';

export function captureWebVitals(): Promise<PerformanceMetrics> {
  return new Promise((resolve) => {
    let metrics: Partial<PerformanceMetrics> = {};

    // Time to First Byte
    const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    metrics.timeToFirstByte = navigationEntry.responseStart - navigationEntry.requestStart;

    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        metrics.firstContentfulPaint = entries[0].startTime;
      }
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        metrics.largestContentfulPaint = entries[entries.length - 1].startTime;
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      if (entries.length > 0) {
        metrics.firstInputDelay = entries[0].duration;
      }
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      let cumulativeScore = 0;
      entryList.getEntries().forEach((entry) => {
        const layoutShift = entry as unknown as LayoutShiftEntry;
        if (!layoutShift.hadRecentInput) {
          cumulativeScore += layoutShift.value;
        }
      });
      metrics.cumulativeLayoutShift = cumulativeScore;
    }).observe({ entryTypes: ['layout-shift'] });
    
    // Time to Interactive (approximation)
    const checkInteractive = () => {
      if (document.readyState === 'complete') {
        metrics.timeToInteractive = performance.now();
        resolve(metrics as PerformanceMetrics);
      } else {
        setTimeout(checkInteractive, 100);
      }
    };
    checkInteractive();
  });
}