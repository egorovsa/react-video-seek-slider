import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }: { mode: string }) => {
  const isDev = mode === 'development';

  if (isDev) {
    // Development configuration
    return {
      plugins: [react()],
      server: {
        port: 3000,
        host: 'localhost',
      },
      build: {
        sourcemap: true,
      },
      css: {
        preprocessorOptions: {
          scss: {
            api: 'modern-compiler',
          },
        },
      },
      test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: ['./src/test-setup.ts'],
      },
    };
  }

  // Production configuration for library build
  return {
    plugins: [
      react(),
      dts({
        insertTypesEntry: true,
        exclude: ['src/app.tsx', 'src/dev-layout.tsx'],
      }),
    ],
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.tsx'),
        name: 'VideoSeekSlider',
        fileName: 'index',
        formats: ['es', 'cjs'],
      },
      rollupOptions: {
        external: ['react', 'react-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
          assetFileNames: (assetInfo) => {
            if (assetInfo.name === 'style.css') {
              return 'styles.css';
            }
            return assetInfo.name || 'asset';
          },
        },
      },
      sourcemap: true,
      outDir: 'lib',
      emptyOutDir: true,
    },
    css: {
      modules: false,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test-setup.ts'],
    },
  };
});
