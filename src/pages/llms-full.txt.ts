import type { APIRoute } from 'astro'
import { getCollection } from 'astro:content'
import { llmsFull } from '../lib/llms'

export const GET: APIRoute = async () => {
  const docs = await getCollection('docs')
  const descriptions = new Map<string, string | undefined>(
    docs.map((entry) => [entry.id.replace(/\.(md|mdx)$/, ''), entry.data.description])
  )
  const body = llmsFull((slug) => descriptions.get(slug))
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
