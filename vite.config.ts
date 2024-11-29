import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    port: 3000,
    host: true
  },
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react']
  },
  resolve: {
    alias: {
      'react': 'react',
      'react-dom': 'react-dom'
    }
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'leaflet', 'react-leaflet']
        },
        compact: true,
        generatedCode: {
          preset: 'es2015'
        },
        format: 'es'
      }
    }
  }
});