/// <reference types="vite/client" />

interface Window {
  dataLayer: any[];
  gtag: (type: string, ...args: any[]) => void;
}