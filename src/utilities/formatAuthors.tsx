import Link from 'next/link'
import { Post } from '@/payload-types'

/**
 * Formats an array of populatedAuthors from Posts into a prettified string.
 * @param authors - The populatedAuthors array from a Post.
 * @returns A prettified string of authors.
 * @example
 *
 * [Author1, Author2] becomes 'Author1 and Author2'
 * [Author1, Author2, Author3] becomes 'Author1, Author2, and Author3'
 *
 */
export const formatAuthors = (
  authors: NonNullable<NonNullable<Post['populatedAuthors']>[number]>[],
) => {
  // Ensure we don't have any authors without a name
  const authorNames = authors.map((author) => author.name).filter(Boolean)

  if (authorNames.length === 0) return ''
  if (authorNames.length === 1)
    return <Link href={`/author/${authorNames[0]}`}>{authorNames[0]}</Link>
  if (authorNames.length === 2)
    return (
      <>
        <Link href={`/author/${authorNames[0]}`}>{authorNames[0]}</Link> and{' '}
        <Link href={`/author/${authorNames[1]}`}>{authorNames[1]}</Link>
      </>
    )

  return (
    <>
      {authorNames.slice(0, -1).map((author, index) => (
        <span key={`author-${index}`}>
          <Link href={`/author/${author}`}>{author}</Link>
          {index < authorNames.length - 2 ? ', ' : ' and '}
        </span>
      ))}
      <Link href={`/author/${authorNames[authorNames.length - 1]}`}>
        {authorNames[authorNames.length - 1]}
      </Link>
    </>
  )
}
