interface CacheItem<T> {
  data: T;
  timestamp: number;
}

class RequestCache {
  private cache: Map<string, CacheItem<any>> = new Map();
  private readonly TTL = 20000; // 20 seconds cache lifetime

  set<T>(key: string, data: T): void {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  get<T>(key: string): T | null {
    const item = this.cache.get(key);
    if (!item) return null;

    if (Date.now() - item.timestamp > this.TTL) {
      this.cache.delete(key);
      return null;
    }

    return item.data as T;
  }

  clear(): void {
    this.cache.clear();
  }
}

export const requestCache = new RequestCache();