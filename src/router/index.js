import { createRouter, createWebHistory } from 'vue-router'
import TestView1 from '@/views/TestView1.vue'
import TestView2 from '@/views/TestView2.vue'

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
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
