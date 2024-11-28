import { ImageConfig } from '../../types/performance';

const WEBP_SUPPORT = 'image/webp';
const AVIF_SUPPORT = 'image/avif';

export async function checkImageFormat(): Promise<string[]> {
  const formats: string[] = ['jpeg'];
  
  if (typeof window !== 'undefined') {
    const canvas = document.createElement('canvas');
    if (canvas.toDataURL(WEBP_SUPPORT).indexOf(`data:${WEBP_SUPPORT}`) === 0) {
      formats.push('webp');
    }
    if (canvas.toDataURL(AVIF_SUPPORT).indexOf(`data:${AVIF_SUPPORT}`) === 0) {
      formats.push('avif');
    }
  }
  
  return formats;
}

export function generateSrcSet(url: string, sizes: number[]): string {
  return sizes
    .map(size => `${url}?w=${size} ${size}w`)
    .join(', ');
}

export function getOptimalImageSize(
  containerWidth: number,
  pixelRatio: number = window.devicePixelRatio || 1
): number {
  return Math.ceil(containerWidth * pixelRatio);
}

export async function preloadCriticalImages(images: ImageConfig[]): Promise<void> {
  const formats = await checkImageFormat();
  const bestFormat = formats[formats.length - 1];
  
  images.forEach(image => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = `${image.url}?format=${bestFormat}`;
    document.head.appendChild(link);
  });
}