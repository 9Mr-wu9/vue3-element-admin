import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layoyut/index.vue";
import componentsRouter from './modules/components';
import chartsRouter from './modules/charts';
import nestedRouter from './modules/nested';
import tableRouter from './modules/table'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect.vue'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401.vue'),
    hidden: true
  },
  {
    path: "/",
    component: Layout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/dashboard/index.vue"),
        name: "Dashboard",
        meta: { title: "Dashboard", icon: "dashboard", affix: true }
      }
    ]
  },
  {
    path: "/documentation",
    component: Layout,
    children: [
      {
        path: "index",
        component: () => import("@/views/documentation/index.vue"),
        name: "Documentation",
        meta: { title: "Documentation", icon: "documentation", affix: true }
      }
    ]
  },
  {
    path: "/guide",
    component: Layout,
    redirect: "/guide/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/guide/index.vue"),
        name: "Guide",
        meta: { title: "Guide", icon: "guide", affix: true }
      }
    ]
  },
  {
    path: "/profile",
    component: Layout,
    redirect: "/profile/index",
    children: [
      {
        path: "index",
        component: () => import("@/views/profile/index.vue"),
        name: "Profile",
        meta: { title: "Profile", icon: "user", affix: true }
      }
    ]
  },
];

export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: "/permission/page",
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: 'Permission',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      {
        path: 'page',
        component: () => import("@/views/profile/index.vue"),
        name: 'PagePermission',
        meta: {
          title: 'Page Permission',
          roles: ['admin']
        },
      },
      {
        path: 'directive',
        component: () => import("@/views/profile/index.vue"),
        name: 'DirectivePermission',
        meta: {
          title: 'Directive Permission'
        },
      },
      {
        path: 'role',
        component: () => import("@/views/profile/index.vue"),
        name: 'RolePermission',
        meta: {
          title: 'Role Permission',
          roles: ['admin']
        },
      }
    ]
  },
  {
    path: '/icon',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import("@/views/profile/index.vue"),
        name: 'Icons',
        meta: { title: 'Icons', icon: 'icon', noCache: true }
      }
    ]
  },
  componentsRouter,
  chartsRouter,
  nestedRouter,
  tableRouter,
  {
    path: '/example',
    component: Layout,
    redirect: '/example/list',
    name: 'Example',
    meta: {
      title: 'Example',
      icon: 'el-icon-s-help'
    },
    children: [
      {
        path: 'create',
        component: () => import("@/views/profile/index.vue"),
        name: 'CreateArticle',
        meta: { title: 'Create Article', icon: 'edit' }
      },
      {
        path: 'edit/:id(\\d+)',
        component: () => import("@/views/profile/index.vue"),
        name: 'EditArticle',
        meta: { title: 'Edit Article', noCache: true, activeMenu: '/example/list' },
        hidden: true
      },
      {
        path: 'list',
        component: () => import("@/views/profile/index.vue"),
        name: 'ArticleList',
        meta: { title: 'Article List', icon: 'list' }
      }
    ]
  },

  {
    path: '/tab',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import("@/views/profile/index.vue"),
        name: 'Tab',
        meta: { title: 'Tab', icon: 'tab' }
      }
    ]
  },

  {
    path: '/error',
    component: Layout,
    redirect: 'noRedirect',
    name: 'ErrorPages',
    meta: {
      title: 'Error Pages',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/error-page/401.vue'),
        name: 'Page401',
        meta: { title: '401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/error-page/404.vue'),
        name: 'Page404',
        meta: { title: '404', noCache: true }
      }
    ]
  },

  {
    path: '/error-log',
    component: Layout,
    children: [
      {
        path: 'log',
        component: () => import("@/views/profile/index.vue"),
        name: 'ErrorLog',
        meta: { title: 'Error Log', icon: 'bug' }
      }
    ]
  },

  {
    path: '/excel',
    component: Layout,
    redirect: '/excel/export-excel',
    name: 'Excel',
    meta: {
      title: 'Excel',
      icon: 'excel'
    },
    children: [
      {
        path: 'export-excel',
        component: () => import("@/views/profile/index.vue"),
        name: 'ExportExcel',
        meta: { title: 'Export Excel' }
      },
      {
        path: 'export-selected-excel',
        component: () => import("@/views/profile/index.vue"),
        name: 'SelectExcel',
        meta: { title: 'Export Selected' }
      },
      {
        path: 'export-merge-header',
        component: () => import("@/views/profile/index.vue"),
        name: 'MergeHeader',
        meta: { title: 'Merge Header' }
      },
      {
        path: 'upload-excel',
        component: () => import("@/views/profile/index.vue"),
        name: 'UploadExcel',
        meta: { title: 'Upload Excel' }
      }
    ]
  },

  {
    path: '/zip',
    component: Layout,
    redirect: '/zip/download',
    alwaysShow: true,
    name: 'Zip',
    meta: { title: 'Zip', icon: 'zip' },
    children: [
      {
        path: 'download',
        component: () => import("@/views/profile/index.vue"),
        name: 'ExportZip',
        meta: { title: 'Export Zip' }
      }
    ]
  },

  {
    path: '/pdf',
    component: Layout,
    redirect: '/pdf/index',
    children: [
      {
        path: 'index',
        component: () => import("@/views/profile/index.vue"),
        name: 'PDF',
        meta: { title: 'PDF', icon: 'pdf' }
      }
    ]
  },
  {
    path: '/pdf/download',
    component: () => import("@/views/profile/index.vue"),
    hidden: true
  },

  {
    path: '/theme',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import("@/views/profile/index.vue"),
        name: 'Theme',
        meta: { title: 'Theme', icon: 'theme' }
      }
    ]
  },

  {
    path: '/clipboard',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import("@/views/profile/index.vue"),
        name: 'ClipboardDemo',
        meta: { title: 'Clipboard', icon: 'clipboard' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://github.com/PanJiaChen/vue-element-admin',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ top: 0 })
});

export default router;
