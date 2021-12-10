import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
      babel: {
        plugins: ['@emotion/babel-plugin'],
      },
    }),
  ],
  resolve: {
    alias: {
      '/@': srcPath,
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    },
  },
  define: {
    VITE_ENV_STAGE: process.env.STAGE ?? JSON.stringify('development')
  }
})
