import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import babel from "vite-babel-plugin";
import nodePolyfills from 'rollup-plugin-polyfill-node';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        nodePolyfills(),
        babel(),
    ],
});
