import { createRouter, createWebHistory } from 'vue-router'
import TestView1 from '@/views/TestView1.vue'
import TestView2 from '@/views/TestView2.vue'
import TestView3 from '@/views/TestView3.vue'
import TestView4 from '@/views/TestView4.vue'
import TestView5 from '@/views/TestView5.vue'
import TestView6 from '@/views/TestView6.vue'
import TestView7 from '@/views/TestView7.vue'
import TestView8 from '@/views/TestView8.vue'
import TestView9 from '@/views/TestView9.vue'

export const routes = [
  { path: '/', name: 'test1', component: TestView1 },
  { path: '/test2', name: 'test2', component: TestView2 },
  { path: '/test3', name: 'test3', component: TestView3 },
  { path: '/test4', name: 'test4', component: TestView4 },
  { path: '/test5', name: 'test5', component: TestView5 },
  { path: '/test6', name: 'test6', component: TestView6 },
  { path: '/test7', name: 'test7', component: TestView7 },
  { path: '/test8', name: 'test8', component: TestView8 },
  { path: '/test9', name: 'test9', component: TestView9 },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
