import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import path from 'path'

// Tailwind Config'i doğrudan buraya dahil edebiliriz veya dosya yolunu gösterebiliriz.
// En garantisi, postcss pluginleri olarak tanımlamak.

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    css: {
        postcss: {
            plugins: [
                tailwindcss({
                    content: [
                        "./index.html",
                        "./src/**/*.{js,ts,jsx,tsx}",
                    ],
                    theme: {
                        extend: {
                            colors: {
                                primary: "#4F46E5",
                                secondary: "#10B981",
                                dark: "#1F2937",
                            },
                            fontFamily: {
                                sans: ['Inter', 'sans-serif'],
                            }
                        },
                    },
                }),
                autoprefixer(),
            ],
        },
    },
    build: {
        outDir: 'dist',
        emptyOutDir: true,
    },
})
