import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables from env files
  const env = loadEnv(mode, process.cwd(), '');

  // Determine API URL based on mode
  const apiUrl = mode === 'production'
    ? (env.VITE_API_URL || 'https://be.nicola.id/api')
    : '/api';

  return {
    base: '/',
    server: {
      host: "::",
      port: 8080,
      proxy: {
        '/api': {
          target: 'http://localhost:5992',
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/api/, '/api')
        }
      }
    },
    define: {
      'import.meta.env.VITE_API_URL': JSON.stringify(env.VITE_API_URL || apiUrl),
      'import.meta.env.VITE_APP_TITLE': JSON.stringify(env.VITE_APP_TITLE || 'Portfolio'),
      'import.meta.env.VITE_APP_DESCRIPTION': JSON.stringify(env.VITE_APP_DESCRIPTION || 'Portfolio website'),
      'import.meta.env.VITE_APP_URL': JSON.stringify(env.VITE_APP_URL || 'http://localhost:8080'),
      'import.meta.env.VITE_DEBUG': JSON.stringify(env.VITE_DEBUG === 'true' || mode === 'development')
    },
    plugins: [
      react(),
      mode === 'development' && componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: 'es2020',
      minify: 'terser',
      cssMinify: true,
      sourcemap: mode === 'development',
      // Optimize chunk size
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            // Core React chunks
            'vendor-react': [
              'react',
              'react-dom',
              'react-router-dom'
            ],
            'vendor-query': [
              '@tanstack/react-query'
            ],
            // Split admin components separately
            'admin': [
              './src/pages/DashboardPage',
              './src/pages/PortfolioListPage',
              './src/pages/PortfolioEditPage',
              './src/pages/PortfolioCreatePage',
              './src/pages/ContactListPage',
              './src/layouts/AdminLayout'
            ],
            // Core UI components
            'ui-core': [
              '@radix-ui/react-dialog',
              '@radix-ui/react-dropdown-menu',
              '@radix-ui/react-slot'
            ],
            // Form-related components
            'ui-forms': [
              '@radix-ui/react-label',
              'react-hook-form',
              '@hookform/resolvers',
              'zod'
            ],
            // Extended UI components
            'ui-extended': [
              '@radix-ui/react-toast',
              '@radix-ui/react-accordion',
              '@radix-ui/react-tabs',
              '@radix-ui/react-popover'
            ],
            // Utilities
            'utils': [
              'date-fns',
              'lucide-react',
              'sonner',
              'clsx',
              'tailwind-merge'
            ],
            // Animation libraries
            'animation': [
              'framer-motion'
            ]
          },
          chunkFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const ext = assetInfo.name?.split('.').pop() || '';
            if (ext === 'css') {
              return 'assets/css/[name]-[hash].css';
            }
            if (['png', 'jpg', 'jpeg', 'webp', 'svg'].includes(ext)) {
              return 'assets/images/[name]-[hash].[ext]';
            }
            return 'assets/[name]-[hash].[ext]';
          }
        }
      },
      terserOptions: {
        compress: {
          drop_console: mode === 'production',
          drop_debugger: mode === 'production',
          pure_funcs: mode === 'production' ? ['console.log', 'console.info', 'console.debug'] : [],
          // Additional compression options
          dead_code: true,
          unused: true,
        },
        mangle: {
          safari10: true,
        },
        format: {
          safari10: true,
        }
      }
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
      ],
    },
    // Performance optimizations
    esbuild: {
      logOverride: { 'this-is-undefined-in-esm': 'silent' },
      // Tree shake unused code more aggressively
      treeShaking: true,
      minifyIdentifiers: mode === 'production',
      minifySyntax: mode === 'production',
      minifyWhitespace: mode === 'production',
    }
  };
});

