import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NProgress from 'nprogress'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/RegisterView.vue'),
    },
    {
      path: '/',
      name: 'dashboard',
      component: () => import('@/views/dashboard/DashboardView.vue'),
    },
    {
      path: '/courses',
      name: 'courses',
      component: () => import('@/views/courses/CoursesView.vue'),
    },
    {
      path: '/course/:id',
      name: 'course',
      component: () => import('@/views/courses/CourseView.vue'),
    },
    {
      path: '/content',
      name: 'content',
      component: () => import('@/views/content/ContentView.vue'),
    },
    {
      path: '/centred',
      name: 'centred',
      component: () => import('@/views/centred/CentredView.vue'),
    },
    {
      path: '/cxentre',
      name: 'cxentre',
      component: () => import('@/views/cxentre/CXentreView.vue'),
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFoundView,
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkErrorView,
    },
  ],
})

router.beforeEach(() => {
  NProgress.start()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
