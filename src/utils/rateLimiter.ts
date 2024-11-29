class RateLimiter {
  private lastRequest: number = 0;
  private readonly minInterval = 15000; // 15 seconds between requests
  private readonly maxRetries = 3;
  private retryCount = 0;

  canMakeRequest(): boolean {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    if (timeSinceLastRequest >= this.minInterval) {
      this.retryCount = 0;
      return true;
    }
    return this.retryCount < this.maxRetries && timeSinceLastRequest >= 5000;
  }

  recordRequest(): void {
    this.lastRequest = Date.now();
    this.retryCount++;
  }
}

export const rateLimiter = new RateLimiter();