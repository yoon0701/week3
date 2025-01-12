import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
  ],
  resolve: {
    alias: {
      // 필요한 경우 별칭 추가
    },
  },
  optimizeDeps: {
    include: ['@svgr/webpack'], // svgr을 Vite에서 사용 가능하게 설정
  },
  build: {
  
    rollupOptions: {
      // 추가로 설정이 필요한 경우
    },
  },
});
