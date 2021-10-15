import { createRouter, createWebHashHistory } from 'vue-router'


const router = createRouter({
  routes: [
    {
      path: '/bill',
      meta: {
        title: '账单',
        index: 0,
      },
      component: () => import('../components/Bill.vue'),
    },
    {
      path: '/add',
      meta: {
        title: '记一笔',
        index: 1,
      },
      component: () => import('../components/Add.vue'),
    },
    {
      path: '/',
      meta: {
        title: '我的',
        index: 2,
      },
      component: () => import('../components/Me.vue'),
    },
    {
      path: '/stats',
      meta: {
        title: '统计',
        index: 3,
      },
      component: () => import('../components/Stats.vue'),
    },
    {
      path: '/login',
      meta: {
        title: '登录',
        index: 4,
      },
      component: () => import('../components/Login.vue'),
    }
  ],
  history: createWebHashHistory(),
})

router.beforeEach((to) => {
  document.title = to.meta.title
})

export default router