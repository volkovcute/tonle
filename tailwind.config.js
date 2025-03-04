/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                customBg: 'oklch(0.83 0.12 66.55)',
                success: 'oklch(0.72 0.2 147.85)',
            },
        },
    },
    daisyui: {
        themes: ['light', 'dracula'],
    },
    plugins: [require('daisyui')],
}
