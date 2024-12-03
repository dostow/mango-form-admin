import { defineConfig } from 'vite';
import pluginReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    open: true,
  },
  build: {
    outDir: 'build',
  },
});
