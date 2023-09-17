import { defineConfig } from 'tsup';

export default defineConfig(options => ({
  platform: 'node',
  target: 'node20',
  entry: ['src/index.ts'],
  dts: true,
  sourcemap: true,
  format: ['cjs', 'esm'],
  minify: !options.watch,
  clean: true,
}));
