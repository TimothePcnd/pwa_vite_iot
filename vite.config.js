import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
    base: './',
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            // includeAssets supprimé car pas besoin de vite.svg
            manifest: {
                name: 'Progressive Web App',
                short_name: 'PWA',
                description: 'Application Progressive Web App',
                theme_color: '#000000',
                background_color: '#ffffff',
                display: 'standalone',
                orientation: 'portrait-primary',
                scope: '/',
                start_url: './',
                icons: []
            },
            workbox: {
                navigateFallback: 'index.html',
                globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,webp}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/iot\.olasserre\.dev-campus\.fr\/api\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-sondes',
                            networkTimeoutSeconds: 4,
                            expiration: { maxEntries: 100, maxAgeSeconds: 300 },
                            cacheableResponse: { statuses: [0, 200] }
                        }
                    },
                    {
                        urlPattern: ({ request }) =>
                            request.destination === 'style' || request.destination === 'script',
                        handler: 'StaleWhileRevalidate',
                        options: { cacheName: 'static-resources' }
                    },
                    {
                        urlPattern: ({ request }) => request.destination === 'image',
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'images',
                            expiration: { maxEntries: 120, maxAgeSeconds: 60 * 60 * 24 * 30 }
                        }
                    }
                ]
            }
        })
    ],
})
