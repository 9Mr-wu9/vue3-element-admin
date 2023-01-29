import Layout from '@/layoyut/index.vue'

const tableRouter = {
  path: '/table',
  component: Layout,
  redirect: '/table/complex-table',
  name: 'Table',
  meta: {
    title: 'Table',
    icon: 'chartablet'
  },
  children: [
    {
      path: 'dynamic-table',
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'DynamicTable',
      meta: { title: 'Dynamic Table' }
    },
    {
      path: 'drag-table',
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'DragTable',
      meta: { title: 'Drag Table' }
    },
    {
      path: 'inline-edit-table',
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'InlineEditTable',
      meta: { title: 'Inline Edit Table' }
    },
    {
      path: 'complex-table',
      component: () => import('@/views/charts/keyboard.vue'),
      name: 'ComplexTable',
      meta: { title: 'Complex Table' }
    },
  ]
}

export default tableRouter;
