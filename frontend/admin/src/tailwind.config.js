export default {
  mode: 'jit',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: false,
  theme: {
    extend: {
      fontFamily: {
        custom: ['i', 'sans-serif'],
        customMedium: ['i-m', 'sans-serif'],
        customBold: ['i-b', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
