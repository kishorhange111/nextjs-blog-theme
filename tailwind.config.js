// Tailwind CSS configuration. Most settings live in src/utils/tailwind-preset.js.
module.exports = {
  mode: 'jit',
  // Files Tailwind scans for class names; unused classes are left out of the CSS.
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  presets: [require('./src/utils/tailwind-preset')],
};
