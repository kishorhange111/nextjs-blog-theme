/**
 * Helpers for reading blog posts from the posts/ folder.
 *
 * These run only at build time (inside getStaticProps / getStaticPaths), which
 * is why they can use Node's fs module even though this is a React app.
 */
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';
import rehypePrism from '@mapbox/rehype-prism';
import remarkGfm from 'remark-gfm';

// POSTS_PATH is useful when you want to get the path to a specific file
export const POSTS_PATH = path.join(process.cwd(), 'posts');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = fs
  .readdirSync(POSTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.mdx?$/.test(path));

/**
 * Sort posts newest first, using the `date` field from each post's front matter.
 * Note: Array.prototype.sort sorts in place, so the input array is changed too.
 *
 * @param {Array<{data: {date: string}}>} posts
 * @returns {Array} The same array, sorted.
 */
export const sortPostsByDate = (posts) => {
  return posts.sort((a, b) => {
    const aDate = new Date(a.data.date);
    const bDate = new Date(b.data.date);
    // Subtracting dates gives milliseconds; b - a puts later dates first.
    return bDate - aDate;
  });
};

/**
 * Read every post file and split it into front matter and Markdown body.
 *
 * @returns {Array<{content: string, data: object, filePath: string}>}
 *   Posts sorted newest first. `data` is the front matter (title, date, ...).
 */
export const getPosts = () => {
  let posts = postFilePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(POSTS_PATH, filePath));
    // gray-matter separates the YAML block between the --- lines (data)
    // from the Markdown that follows it (content).
    const { content, data } = matter(source);

    return {
      content,
      data,
      filePath,
    };
  });

  posts = sortPostsByDate(posts);

  return posts;
};

/**
 * Load one post and compile its MDX so the page can render it.
 *
 * @param {string} slug - File name without extension, e.g. "hello-world".
 * @returns {Promise<{mdxSource: object, data: object, postFilePath: string}>}
 *   `mdxSource` is the serialized MDX that <MDXRemote> renders on the page.
 */
export const getPostBySlug = async (slug) => {
  const postFilePath = path.join(POSTS_PATH, `${slug}.mdx`);
  const source = fs.readFileSync(postFilePath);

  const { content, data } = matter(source);

  const mdxSource = await serialize(content, {
    // Optionally pass remark/rehype plugins
    mdxOptions: {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
    },
    scope: data,
  });

  return { mdxSource, data, postFilePath };
};

/**
 * Find the post published right *after* the given one.
 *
 * Posts are sorted newest first, so the newer post sits one index earlier.
 *
 * @param {string} slug - Slug of the current post.
 * @returns {{title: string, slug: string} | null} null for the newest post.
 */
export const getNextPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex - 1];
  // no prev post found
  if (!post) return null;

  const nextPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: nextPostSlug,
  };
};

/**
 * Find the post published right *before* the given one (one index later in
 * the newest-first list).
 *
 * @param {string} slug - Slug of the current post.
 * @returns {{title: string, slug: string} | null} null for the oldest post.
 */
export const getPreviousPostBySlug = (slug) => {
  const posts = getPosts();
  const currentFileName = `${slug}.mdx`;
  const currentPost = posts.find((post) => post.filePath === currentFileName);
  const currentPostIndex = posts.indexOf(currentPost);

  const post = posts[currentPostIndex + 1];
  // no prev post found
  if (!post) return null;

  const previousPostSlug = post?.filePath.replace(/\.mdx?$/, '');

  return {
    title: post.data.title,
    slug: previousPostSlug,
  };
};
