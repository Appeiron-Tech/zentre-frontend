import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('@/views/content/ContentView.vue'),
    },
    {
      path: '/cxentre',
      name: 'cxentre',
      component: () => import('@/views/cxentre/CXentreView.vue'),
    },
  ],
})

export default router
