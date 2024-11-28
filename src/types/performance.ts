export interface LayoutShiftMetric extends PerformanceEntry {
  value: number;
  hadRecentInput: boolean;
}

export interface ImageConfig {
  url: string;
  sizes: number[];
  lazy?: boolean;
  priority?: 'high' | 'low';
}

export interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: string;
}