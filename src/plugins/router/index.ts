import { createRouter, createWebHistory } from 'vue-router'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NProgress from 'nprogress'
import { getCurrentUser } from 'vuefire'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/components/layouts/AppLayout.vue'),
      children: [
        {
          path: 'dashboard',
          name: 'dashboard',
          alias: '/',
          component: () => import('@/views/dashboard/DashboardView.vue'),
        },
        // {
        //   path: 'courses',
        //   name: 'courses',
        //   component: () => import('@/views/courses/CoursesView.vue'),
        // },
        // {
        //   path: 'course/:id',
        //   name: 'course',
        //   component: () => import('@/views/courses/CourseView.vue'),
        // },
        {
          path: 'stores',
          name: 'stores',
          component: () => import('@/views/stores/StoreView.vue'),
        },
        {
          path: 'cxentre',
          name: 'cxentre',
          component: () => import('@/views/cxentre/CXentreView.vue'),
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/components/layouts/LoginLayout.vue'),
      children: [
        {
          path: '/:pathMatch(.*)*',
          name: 'NotFound',
          component: NotFoundView,
        },
        {
          path: '404/:resource',
          name: '404Resource',
          component: NotFoundView,
          props: true,
        },
        {
          path: 'network-error',
          name: 'NetworkError',
          component: NetworkErrorView,
        },
      ],
    },
    {
      path: '/',
      component: () => import('@/components/layouts/LoginLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/LoginView.vue'),
        },
        {
          path: 'register',
          name: 'register',
          component: () => import('@/views/RegisterView.vue'),
        },
        {
          path: 'recoverPassword',
          name: 'recoverPassword',
          component: () => import('../../views/RecoverPassword.vue'),
        },
      ],
    },
  ],
})

router.beforeEach(() => {
  NProgress.start()
})

router.beforeEach(async (to) => {
  const currentUser = await getCurrentUser()
  if (
    !currentUser &&
    to.name !== 'login' &&
    to.name !== 'register' &&
    to.name !== 'recoverPassword'
  ) {
    return { name: 'login' }
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
