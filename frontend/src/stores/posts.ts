import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api/client'

export interface PostSummary {
  id: number
  title: string
  slug: string
  excerpt: string | null
  publishedAt: string
  tags: { name: string; slug: string }[]
}

export interface Post extends PostSummary {
  content: string
  updatedAt: string
}

export interface Tag {
  name: string
  slug: string
  _count: { posts: number }
}

export const usePostsStore = defineStore('posts', () => {
  const list = ref<PostSummary[]>([])
  const current = ref<Post | null>(null)
  const tags = ref<Tag[]>([])
  const activeTag = ref<string | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  async function fetchList(tag?: string) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/posts', { params: { tag } })
      list.value = data
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchBySlug(slug: string) {
    loading.value = true
    error.value = null
    current.value = null
    try {
      const { data } = await api.get(`/posts/${slug}`)
      current.value = data
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchTags() {
    const { data } = await api.get('/tags')
    tags.value = data
  }

  function setActiveTag(tag: string | null) {
    activeTag.value = tag
    fetchList(tag ?? undefined)
  }

  return { list, current, tags, activeTag, loading, error, fetchList, fetchBySlug, fetchTags, setActiveTag }
})
