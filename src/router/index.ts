import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Editor from '@/views/PageEditor.vue'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'Editor',
        component: Editor
      },
    
      {
        path: '/preview',
        name: 'Preview',
        component: () => import('@/views/Preview.vue')
      },
      
];

const router = createRouter({
  history: createWebHistory(),
  routes,

});

export default router;
