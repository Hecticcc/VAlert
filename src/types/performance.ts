export interface LayoutShiftEntry extends PerformanceEntry {
  hadRecentInput: boolean;
  value: number;
  sources?: Array<{
    node?: Node;
    currentRect?: DOMRectReadOnly;
    previousRect?: DOMRectReadOnly;
  }>;
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