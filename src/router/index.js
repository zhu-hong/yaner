import { createRouter, createMemoryHistory } from 'vue-router'
import { message as $message } from 'ant-design-vue'

const router = createRouter({
  routes: [
    {
      path: '/bill',
      name: 'bill',
      meta: {
        title: '账单',
        index: 0,
      },
      component: () => import('../components/Bill/index.vue'),
    },
    {
      path: '/add',
      name: 'add',
      meta: {
        title: '记一笔',
        index: 1,
      },
      component: () => import('../components/Add/index.vue'),
    },
    {
      path: '/',
      name: 'me',
      meta: {
        title: '我的',
        index: 2,
      },
      component: () => import('../components/Me/index.vue'),
    },
    {
      path: '/stats',
      name: 'stats',
      meta: {
        title: '统计',
        index: 3,
      },
      component: () => import('../components/Stats/index.vue'),
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        index: 4,
      },
      component: () => import('../components/Login/index.vue'),
    }
  ],
  history: createMemoryHistory(),
})

router.beforeEach((to) => {
  document.title = to.meta.title

  if (to.name !== 'login') {
    if (!localStorage.getItem('token')) {
      $message.info('请先登录')
      router.push({ name: 'login' })
      return false
    }
  }
})

export default router