import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react()],
  // GitHub Pages(https://839jhc9675.github.io/ui_test/)는 하위 경로에서 서비스되므로 빌드 시에만 base 지정
  base: command === 'build' ? '/ui_test/' : '/',
}))
