import { defineConfig, UserConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    assetsInclude: ['**/*.lottie'],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    server: {
        port: 3000,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://localhost:3001/',
                changeOrigin: true,
                secure: false,
                ws: true,
            },
            '/docs': {
                target: 'http://localhost:3001/',
                changeOrigin: true,
                secure: false,
                ws: false,
            },
        },
        allowedHosts: ['localhost', 'oriented-lively-satyr.ngrok-free.app'],
    },
    preview: {
        port: 3000,
        host: '0.0.0.0',
    },
} as UserConfig);
