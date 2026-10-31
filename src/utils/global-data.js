/**
 * Site-wide text shown in the header, page title and footer.
 *
 * Each value can be overridden with an environment variable at build time
 * (handy on Netlify, where they are set in the site settings). decodeURI lets
 * values contain URL-encoded characters such as %20 for spaces.
 *
 * @returns {{ name: string, blogTitle: string, footerText: string }}
 */
export const getGlobalData = () => {
  const name = process.env.BLOG_NAME
    ? decodeURI(process.env.BLOG_NAME)
    : 'Kishor Hange';
  const blogTitle = process.env.BLOG_TITLE
    ? decodeURI(process.env.BLOG_TITLE)
    : 'Notes on ML & Software Engineering';
  const footerText = process.env.BLOG_FOOTER_TEXT
    ? decodeURI(process.env.BLOG_FOOTER_TEXT)
    : 'All rights reserved.';

  return {
    name,
    blogTitle,
    footerText,
  };
};
