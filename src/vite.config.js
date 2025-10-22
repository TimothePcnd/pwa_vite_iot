import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    plugins: [
        VitePWA({
            manifest: {
                name: 'Mon Application PWA',
                short_name: 'MonApp',
                description: 'Une app géniale qui fonctionne hors ligne!',
                theme_color: '#2d2d2d',
                background_color: '#ffffff',
                display: 'standalone',
                start_url: '/',
                icons:[]
            },
            filename: 'manifest.webmanifest',  // Crée un fichier manifest.webmanifest
        }),
    ],
});
