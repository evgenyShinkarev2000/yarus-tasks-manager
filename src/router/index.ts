import { createRouter, createWebHashHistory, createWebHistory, RouteLocation, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { services } from '@/main';
import { Permission } from '@/services/permission/PermissionEnum';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    redirect: 'workPlace'
  },
  {
    path: '/auth',
    name: 'login',
    component: () => import('@/pages/AuthPage.vue'),
  },
  {
    path: '/workPlace',
    name: 'workPlace',
    component: () => import('@/pages/WorkPlacePage.vue'),
    redirect: {name: 'tasks'},
    meta: { permissions: [Permission.Authenticated] },
    children: [
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/components/TasksPage.vue')
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect(to: RouteLocation) {
      return {
        name: 'error404',
      };
    },
  },
  {
    path: '/errors/404',
    name: 'error404',
    component: () => import('@/components/Error404Page.vue')
  },
  {
    path: '/errors/500',
    name: 'error500',
    component: () => import('@/components/Error500Page.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from) => {
  if (!services.permissionService.isAuthenticated(to)){
    return {name: 'login'};
  }
  if (!services.permissionService.hasPermissions(to)){
    return {name: 'error404'};
  }
});

export default router
