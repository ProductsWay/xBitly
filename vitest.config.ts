/// <reference types="vitest" />
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
    // @ts-expect-error - vite types are not up to date
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
    },
});
