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
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '无人车后台管理终端', icon: 'dashboard' }
    }]
  },

  {
    path: '/editloads',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'editloads',
        component: () => import('@/views/editloads/index'),
        meta: { title: '编辑装载', icon: 'form' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/notification/index'),
        meta: { title: '无人车信息', icon: 'form' }
      }
    ]
  },

  {
    path: '/addloads',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'addloads',
        component: () => import('@/views/addloads/index'),
        meta: { title: '添加装载', icon: 'form' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    // meta: { title: '货物装载设置', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'loads',
        name: 'loads',
        component: () => import('@/views/loads/index'),
        meta: { title: '货物装载设置', icon: 'table' }
      }
    ]
  },

  {
    path: '/maptest',
    hidden: true,
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'maptest',
        component: () => import('@/views/maptest/index'),
        meta: { title: '查看地图', icon: 'form' }
      }
    ]
  },

  {
    path: '/orders',
    component: Layout,
    meta: { title: '订单管理', icon: 'el-icon-s-data' },
    children: [
      {
        path: '/ordered',
        name: 'orde',
        component: () => import('@/views/orders/ordered/index'),
        meta: { title: '已下单', icon: 'el-icon-bell' }
      },
      {
        path: '/waiting',
        component: () => import('@/views/orders/waiting/index'),
        meta: { title: '待配送', icon: 'el-icon-timer' }
      },
      {
        path: '/dispatching',
        component: () => import('@/views/orders/dispatching/index'),
        meta: { title: '派件中', icon: 'el-icon-s-promotion' }
      },
      {
        path: '/arrived',
        component: () => import('@/views/orders/arrived/index'),
        meta: { title: '已送达', icon: 'el-icon-success' }
      },
      {
        path: '/rejected',
        component: () => import('@/views/orders/rejected/index'),
        meta: { title: '已拒绝', icon: 'el-icon-error' }
      }
    ]
  },

  {
    path: '/maptest2',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'maptest2',
        component: () => import('@/views/maptest2/index'),
        meta: { title: 'AMaptest2', icon: 'form' }
      }
    ]
  }

  /*
  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
*/
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
