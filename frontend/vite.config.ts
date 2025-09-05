import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config as dotenvConfig } from 'dotenv'
import { resolve } from 'path'

// Load .env from parent directory
dotenvConfig({ path: resolve(__dirname, '../.env') })

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
