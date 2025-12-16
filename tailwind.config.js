/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    purple: '#8b5cf6',
                    orange: '#f97316',
                    green: '#10b981',
                    blue: '#3b82f6',
                    yellow: '#fbbf24',
                    red: '#dc2626',
                },
                neutral: {
                    gray: '#6b7280',
                },
                background: '#f9fafb',
                text: {
                    dark: '#1f2937',
                }
            },
            fontFamily: {
                sans: ['"Open Sans"', 'Roboto', 'sans-serif'],
                display: ['"Quicksand"', 'Poppins', 'sans-serif'],
                mono: ['"Computer Modern"', '"KaTeX"', 'monospace'],
            }
        },
    },
    plugins: [],
}
