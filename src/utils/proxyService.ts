import { requestCache } from './cache';
import { rateLimiter } from './rateLimiter';

const TARGET_URL = 'https://mazzanet.net.au/cfa/pager-cfa-all.php';
const PROXY_URLS = [
  'https://api.allorigins.win/raw?url=',
  'https://cors.sh/'
];

export async function fetchWithProxy(proxyIndex = 0): Promise<string> {
  // Check cache first
  const cached = requestCache.get<string>('incidents');
  if (cached) return cached;

  // Enforce rate limiting
  if (!rateLimiter.canMakeRequest()) {
    throw new Error('Rate limit exceeded');
  }

  if (proxyIndex >= PROXY_URLS.length) {
    throw new Error('All CORS proxies failed');
  }

  try {
    const proxyUrl = `${PROXY_URLS[proxyIndex]}${encodeURIComponent(TARGET_URL)}`;
    const response = await fetch(proxyUrl);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.text();
    if (!data || data.length < 100) {
      throw new Error('Invalid response received');
    }
    
    // Cache successful response
    requestCache.set('incidents', data);
    rateLimiter.recordRequest();
    
    return data;
  } catch (error) {
    console.error('Proxy error:', error);
    return fetchWithProxy(proxyIndex + 1);
  }
}