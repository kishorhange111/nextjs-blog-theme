import Link from 'next/link';

/**
 * Link used for <a> tags inside MDX posts, so links between pages use Next.js
 * client-side navigation instead of a full page reload.
 * (Next.js 12 requires an <a> child inside <Link>.)
 */
export default function CustomLink({ as, href, ...otherProps }) {
  return (
    <>
      <Link as={as} href={href}>
        <a {...otherProps} />
      </Link>
    </>
  );
}
