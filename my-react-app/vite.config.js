import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Only one export default, with all config merged
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,        // Lock to this port
    strictPort: true   // Don't fallback to other ports
  }
});
