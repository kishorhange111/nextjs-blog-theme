import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

/**
 * Custom Document: controls the outer <html> and <body> markup, which is
 * rendered on the server only. `theme-compiled` attaches the theme's CSS
 * variables (see utils/tailwind-preset.js) to the whole page.
 */
class MyDocument extends Document {
  render() {
    return (
      <Html lang="en" className="theme-compiled">
        <Head />
        <body
          className={`antialiased text-lg bg-white dark:bg-gray-900 dark:text-white leading-base`}
        >
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
