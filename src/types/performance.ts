export interface ImageConfig {
  url: string;
  sizes: number[];
  lazy?: boolean;
  priority?: 'high' | 'low';
}

export interface PerformanceConfig {
  enableMetrics: boolean;
  cacheDuration: number;
  criticalAssets: string[];
  imageOptimization: {
    quality: number;
    formats: string[];
  };
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: string;
}