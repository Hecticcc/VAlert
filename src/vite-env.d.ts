/// <reference types="vite/client" />

interface Window {
  gtag: (type: string, ...args: any[]) => void;
}