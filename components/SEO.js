import Head from 'next/head';

/**
 * Sets the browser tab title and the meta tags used by search engines and
 * link previews. next/head moves these tags into the page <head>.
 *
 * @param {{ title: string, description?: string }} props
 */
export default function SEO({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
    </Head>
  );
}
