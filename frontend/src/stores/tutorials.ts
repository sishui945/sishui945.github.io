import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/api/client'

export interface ChapterSummary {
  id: number
  title: string
  slug: string
  order: number
}

export interface Chapter extends ChapterSummary {
  content: string
  tutorial: {
    title: string
    slug: string
    chapters: ChapterSummary[]
  }
}

export interface TutorialSummary {
  id: number
  title: string
  slug: string
  description: string | null
  category: { id: number; name: string; slug: string }
  chapters: ChapterSummary[]
  publishedAt: string
}

export interface CategoryNode {
  id: number
  name: string
  slug: string
  children: CategoryNode[]
  tutorials: TutorialSummary[]
}

export const useTutorialsStore = defineStore('tutorials', () => {
  const list = ref<TutorialSummary[]>([])
  const tutorial = ref<TutorialSummary | null>(null)
  const chapter = ref<Chapter | null>(null)
  const categories = ref<CategoryNode[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)
  const categoriesError = ref(false)

  let chapterReqId = 0

  async function fetchList(categorySlug?: string) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get('/tutorials', { params: { category: categorySlug } })
      list.value = data
    } catch (e: any) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }

  async function fetchTutorial(slug: string) {
    loading.value = true
    error.value = null
    try {
      const { data } = await api.get(`/tutorials/${slug}`)
      tutorial.value = data
      return data
    } catch (e: any) {
      error.value = e.message
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchChapter(tutorialSlug: string, chapterSlug: string) {
    loading.value = true
    error.value = null
    const id = ++chapterReqId
    try {
      const { data } = await api.get(`/tutorials/${tutorialSlug}/chapters/${chapterSlug}`)
      if (id === chapterReqId) {
        chapter.value = data
      }
      return data
    } catch (e: any) {
      if (id === chapterReqId) {
        error.value = e.message
      }
      return null
    } finally {
      if (id === chapterReqId) {
        loading.value = false
      }
    }
  }

  async function fetchCategories() {
    loading.value = true
    categoriesError.value = false
    try {
      const { data } = await api.get('/categories')
      categories.value = data
    } catch (e: any) {
      categories.value = []
      categoriesError.value = true
    } finally {
      loading.value = false
    }
  }

  return { list, tutorial, chapter, categories, loading, error, categoriesError, fetchList, fetchTutorial, fetchChapter, fetchCategories }
})
