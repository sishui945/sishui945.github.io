import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/blog',
      name: 'blog-list',
      component: () => import('@/views/BlogListView.vue'),
    },
    {
      path: '/blog/:slug',
      name: 'blog-detail',
      component: () => import('@/views/BlogDetailView.vue'),
    },
    {
      path: '/tutorials',
      name: 'tutorial-list',
      component: () => import('@/views/TutorialListView.vue'),
    },
    {
      path: '/tutorials/:slug',
      name: 'tutorial',
      component: () => import('@/views/TutorialView.vue'),
    },
    {
      path: '/tutorials/:slug/:chapterSlug',
      name: 'tutorial-chapter',
      component: () => import('@/views/TutorialView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
