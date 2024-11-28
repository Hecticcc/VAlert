import { useState, useCallback, useRef, useEffect } from 'react';
import { Incident } from '../types/incident';
import { cacheManager } from '../utils/performance/cacheManager';

const BATCH_SIZE = 20;
const CACHE_KEY_PREFIX = 'incidents';
const RETRY_ATTEMPTS = 3;
const RETRY_DELAY = 500;
const PARALLEL_REQUESTS = 2;
const PREFETCH_THRESHOLD = 0.5;

interface UseIncidentLoaderOptions {
  initialPageSize?: number;
  enableCache?: boolean;
  retryAttempts?: number;
  prefetch?: boolean;
}

export function useIncidentLoader({
  initialPageSize = BATCH_SIZE,
  enableCache = true,
  retryAttempts = RETRY_ATTEMPTS,
  prefetch = true
}: UseIncidentLoaderOptions = {}) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [hasMore, setHasMore] = useState(true);
  
  const pageRef = useRef(1);
  const retryCountRef = useRef(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const prefetchedDataRef = useRef<Map<number, Incident[]>>(new Map());

  const fetchIncidents = useCallback(async (page: number, signal?: AbortSignal) => {
    const cacheKey = `${CACHE_KEY_PREFIX}_${page}`;
    
    if (enableCache) {
      const cached = await cacheManager.get<Incident[]>(cacheKey);
      if (cached) return cached;
    }
    
    // Check prefetched data
    const prefetchedData = prefetchedDataRef.current.get(page);
    if (prefetchedData) {
      prefetchedDataRef.current.delete(page);
      return prefetchedData;
    }

    const response = await fetch(
      `https://mazzanet.net.au/cfa/pager-cfa-all.php?page=${page}&size=${initialPageSize}`,
      { signal }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch incidents: ${response.statusText}`);
    }

    const data = await response.json();
    
    if (enableCache) {
      await cacheManager.set(cacheKey, data);
    }

    return data;
  }, [initialPageSize, enableCache]);

  const prefetchNextPages = useCallback(async () => {
    if (!prefetch) return;
    
    const nextPages = Array.from(
      { length: PARALLEL_REQUESTS },
      (_, i) => pageRef.current + i + 1
    );

    const prefetchPromises = nextPages.map(async page => {
      try {
        const data = await fetchIncidents(page);
        prefetchedDataRef.current.set(page, data);
      } catch (error) {
        console.warn(`Failed to prefetch page ${page}:`, error);
      }
    });

    await Promise.all(prefetchPromises);
  }, [fetchIncidents, prefetch]);

  const loadMore = useCallback(async (reset: boolean = false) => {
    if (isLoading || (!hasMore && !reset)) return;

    try {
      setIsLoading(true);
      setError(null);

      if (reset) {
        pageRef.current = 1;
        retryCountRef.current = 0;
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }

      abortControllerRef.current = new AbortController();
      
      const newIncidents = await fetchIncidents(
        pageRef.current,
        abortControllerRef.current.signal
      );

      setIncidents(prev => 
        reset ? newIncidents : [...prev, ...newIncidents]
      );
      
      setHasMore(newIncidents.length === initialPageSize);
      pageRef.current += 1;
      retryCountRef.current = 0;
      
      // Start prefetching next pages
      prefetchNextPages();

    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return;
      }

      if (retryCountRef.current < retryAttempts) {
        retryCountRef.current++;
        setTimeout(() => loadMore(reset), RETRY_DELAY * retryCountRef.current);
      } else {
        setError(err instanceof Error ? err : new Error('Failed to load incidents'));
      }
    } finally {
      setIsLoading(false);
    }
  }, [fetchIncidents, hasMore, isLoading, initialPageSize, retryAttempts, prefetchNextPages]);

  useEffect(() => {
    loadMore(true);
    
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [loadMore]);

  return {
    incidents,
    isLoading,
    error,
    hasMore,
    loadMore,
    refresh: () => loadMore(true)
  };
}