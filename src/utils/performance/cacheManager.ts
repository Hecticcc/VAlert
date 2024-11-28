interface CacheConfig {
  version: string;
  maxAge: number;
  maxItems: number;
}

class CacheManager {
  private config: CacheConfig;
  private cache: Map<string, { data: any; timestamp: number }>;

  constructor(config: CacheConfig) {
    this.config = config;
    this.cache = new Map();

    // Clean up expired items periodically
    setInterval(() => this.cleanup(), 60000); // Every minute
  }

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    
    if (!item) return null;

    const now = Date.now();
    if (now - item.timestamp > this.config.maxAge) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  async set(key: string, data: any): Promise<void> {
    // Ensure we don't exceed max items
    if (this.cache.size >= this.config.maxItems) {
      const oldestKey = Array.from(this.cache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      this.cache.delete(oldestKey);
    }

    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  private cleanup(): void {
    const now = Date.now();
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > this.config.maxAge) {
        this.cache.delete(key);
      }
    }
  }
}

// Create singleton instance
export const cacheManager = new CacheManager({
  version: '1.0.0',
  maxAge: 30 * 60 * 1000, // 30 minutes
  maxItems: 100
});