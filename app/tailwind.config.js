/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{html,js,svelte,ts}'],
    theme: {
        extend: {
            colors: {
                'sp-red': '#C94A4A',
                'sp-coral': '#E8725A',
                'sp-navy': '#1E2A3B',
                'sp-dark-navy': '#0F1621',
                'sp-cream': '#FAF8F5',
                'sp-white': '#FFFFFF',
                'sp-gray': '#6B7280',
                'sp-light-gray': '#9CA3AF',
                'sp-blue': '#3B5998',
            },
            fontFamily: {
                'display': ['Montserrat', 'system-ui', 'sans-serif'],
                'body': ['Montserrat', 'system-ui', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
