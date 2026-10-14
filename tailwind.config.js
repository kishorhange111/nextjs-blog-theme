// Tailwind CSS configuration. Most settings live in utils/tailwind-preset.js.
module.exports = {
  mode: 'jit',
  // Files Tailwind scans for class names; unused classes are left out of the CSS.
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  presets: [require('./utils/tailwind-preset')],
};
