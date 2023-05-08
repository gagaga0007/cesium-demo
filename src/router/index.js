import { createRouter, createWebHistory } from 'vue-router'
import TestView1 from '@/views/TestView1.vue'
import TestView2 from '@/views/TestView2.vue'
import TestView3 from '@/views/TestView3.vue'
import TestView4 from '@/views/TestView4.vue'

export const routes = [
  {
    path: '/',
    name: 'test1',
    component: TestView1,
  },
  {
    path: '/test2',
    name: 'test2',
    component: TestView2,
  },
  {
    path: '/test3',
    name: 'test3',
    component: TestView3,
  },
  {
    path: '/test4',
    name: 'test4',
    component: TestView4,
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
