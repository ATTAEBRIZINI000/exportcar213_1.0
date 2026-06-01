import BlogClient from './BlogClient'
import postsData from '@/lib/blog-posts.json'

export const metadata = {
  title: 'Blog — Export Car 213',
  description: 'Blog Export Car 213 — Guides pratiques sur l\'export automobile vers l\'Algérie et la Tunisie. CCR, douane, financement, procédures d\'import.',
}

export default function BlogPage() {
  return <BlogClient posts={postsData} />
}
