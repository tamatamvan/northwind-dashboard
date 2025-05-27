import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

import { TanStackRouterVite } from '@tanstack/router-plugin/vite';

import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
      react(),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api':
          env.VITE_REST_API_URL ||
          'http://ec2-34-201-46-215.compute-1.amazonaws.com',
      },
    },
  };
});
