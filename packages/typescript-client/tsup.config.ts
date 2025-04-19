import type { Options } from 'tsup';

const config: Options = {
    format: ['esm', 'cjs', 'iife'],
    entry: ['src/index.ts'],
    dts: true,
    sourcemap: true,
    clean: true,
    minify: process.env.NODE_ENV === 'production',
};

export default config;
