import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/resources',
    children: [{
      path: 'resources',
      name: 'Resources',
      component: () => import('@/views/resources/index'),
      meta: { title: '资源上报', icon: 'dashboard' }
    }]
  },

  {
    path: '/performance',
    component: Layout,
    children: [
      {
        path: 'performance',
        name: 'Performance',
        component: () => import('@/views/performance/index'),
        meta: { title: '性能上报', icon: 'form' }
      }
    ]
  },

  {
    path: '/repair',
    component: Layout,
    children: [
      {
        path: 'repair',
        name: 'Repair',
        component: () => import('@/views/repairOrder/index'),
        meta: { title: '工单报表', icon: 'form' }
      }
    ]
  },

  {
    path: '/alarm',
    component: Layout,
    children: [
      {
        path: 'alarm',
        name: 'Alarm',
        component: () => import('@/views/alarm/index'),
        meta: { title: '告警报表', icon: 'form' }
      }
    ]
  },

  {
    path: '/assessment',
    component: Layout,
    children: [
      {
        path: 'assessment',
        name: 'Assessment',
        component: () => import('@/views/assessment/index'),
        meta: { title: '考核指标报表', icon: 'form' }
      }
    ]
  },

  {
    path: '/resourcesContrast',
    component: Layout,
    children: [{
      path: 'resourcesContrast',
      name: 'ResourcesContrast',
      component: () => import('@/views/resourcesContrast/index'),
      meta: { title: '资源对比', icon: 'dashboard' }
    }]
  },







  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
