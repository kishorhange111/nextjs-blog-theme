// End-to-end smoke test: the built site loads and shows the blog title.
// Run by netlify-plugin-cypress after each Netlify build, or locally with
// `npm run build && npm start` then `npx cypress run`.
describe('sample render test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('displays the title text', () => {
    // Default BLOG_TITLE from src/utils/global-data.js.
    cy.get('h1').contains('Notes on ML & Software Engineering');
  });
});
