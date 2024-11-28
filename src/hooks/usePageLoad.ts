import { useState, useEffect } from 'react';

interface PageLoadState {
  isLoaded: boolean;
  error: Error | null;
}

export function usePageLoad(): PageLoadState {
  const [state, setState] = useState<PageLoadState>({
    isLoaded: false,
    error: null
  });

  useEffect(() => {
    const checkResources = async () => {
      try {
        // Wait for DOM content
        if (document.readyState !== 'complete') {
          await new Promise(resolve => {
            window.addEventListener('load', resolve, { once: true });
          });
        }

        // Check all images are loaded
        const images = Array.from(document.images);
        await Promise.all(
          images.map(img => 
            img.complete 
              ? Promise.resolve() 
              : new Promise((resolve, reject) => {
                  img.addEventListener('load', resolve, { once: true });
                  img.addEventListener('error', reject, { once: true });
                })
          )
        );

        // Check map tiles are loaded (if map exists)
        const mapContainer = document.querySelector('.leaflet-container');
        if (mapContainer) {
          await new Promise(resolve => {
            const checkMap = () => {
              const tiles = document.querySelectorAll('.leaflet-tile-loaded');
              if (tiles.length > 0) {
                resolve(true);
              } else {
                setTimeout(checkMap, 100);
              }
            };
            checkMap();
          });
        }

        setState({ isLoaded: true, error: null });
      } catch (error) {
        console.error('Error loading page resources:', error);
        setState({ 
          isLoaded: false, 
          error: error instanceof Error ? error : new Error('Failed to load page resources') 
        });
      }
    };

    checkResources();
  }, []);

  return state;
}