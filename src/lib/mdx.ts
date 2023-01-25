import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { PostFrontMatter } from '../types/PostFrontMatter'
import getAllFilesRecursively from './utils/files'
import { AuthorFrontMatter } from '../types/AuthorFrontMatter'


const root = process.cwd()

export function formatSlug(slug: string) {
  return slug.replace(/\.(mdx|md)/, '')
}

export function dateSortDesc(a: string, b: string) {
  if (a > b) return -1
  if (a < b) return 1
  return 0
}


export async function getAllFilesFrontMatter(folder: 'blog') {
  const prefixPaths = path.join(root, 'src', 'data', folder)
  const files = getAllFilesRecursively(prefixPaths)

  const allFrontMatter: PostFrontMatter[] = []

  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, '/')
    // Remove Unexpected File
    if (path.extname(fileName) !== '.md' && path.extname(fileName) !== '.mdx') {
      return
    }
    const source = fs.readFileSync(file, 'utf8')
    const matterFile = matter(source)
    const frontmatter = matterFile.data as AuthorFrontMatter | PostFrontMatter
    if ('draft' in frontmatter && frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
      })
    }
  })

  return allFrontMatter.sort((a, b) => dateSortDesc(a.date, b.date))



}