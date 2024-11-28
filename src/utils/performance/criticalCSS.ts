interface CriticalCSSConfig {
  styles: string[];
  nonCriticalStyles: string[];
}

let criticalStylesLoaded = false;
let nonCriticalStylesLoaded = false;

export function injectCriticalCSS(config: CriticalCSSConfig): void {
  if (criticalStylesLoaded) return;

  // Inject critical CSS inline
  const style = document.createElement('style');
  style.textContent = config.styles.join('\n');
  document.head.appendChild(style);
  criticalStylesLoaded = true;

  // Load non-critical CSS asynchronously
  if (!nonCriticalStylesLoaded) {
    requestIdleCallback(() => {
      loadNonCriticalCSS(config.nonCriticalStyles);
    });
  }
}

function loadNonCriticalCSS(styles: string[]): void {
  const stylePromises = styles.map(href => {
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  });

  Promise.all(stylePromises)
    .then(() => {
      nonCriticalStylesLoaded = true;
    })
    .catch(error => {
      console.error('Error loading non-critical CSS:', error);
    });
}