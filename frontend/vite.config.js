import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

// Tailwind Config'i doğrudan buraya dahil edebiliriz veya dosya yolunu gösterebiliriz.
// En garantisi, postcss pluginleri olarak tanımlamak.

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,
        strictPort: true,
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
})
