module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    plugins: [require('@tailwindcss/typography'), require('daisyui')],
    // daisyUI config (optional)
    daisyui: {
        styled: true,
        themes: true,
        base: true,
        utils: true,
        logs: false,
        rtl: false,
        prefix: '',
        themes: ['aqua'],
    },
};
