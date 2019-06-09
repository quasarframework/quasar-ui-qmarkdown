
const routes = [
  {
    path: '/',
    redirect: '/docs'
  },
  {
    path: '/docs',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/examples',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Examples.vue') }
    ]
  },
  {
    path: '/demo',
    component: () => import('layouts/MarkdownLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Markdown.vue'),
        children: [
          { path: '/demo/heading', component: () => import('pages/Heading.vue') },
          { path: '/demo/titles', component: () => import('pages/Titles.vue') },
          { path: '/demo/typographic', component: () => import('pages/Typographic.vue') },
          { path: '/demo/emphasis', component: () => import('pages/Emphasis.vue') },
          { path: '/demo/rules', component: () => import('pages/Rules.vue') },
          { path: '/demo/blockquotes', component: () => import('pages/Blockquotes.vue') },
          { path: '/demo/lists', component: () => import('pages/Lists.vue') },
          { path: '/demo/code', component: () => import('pages/Code.vue') },
          { path: '/demo/tables', component: () => import('pages/Tables.vue') },
          { path: '/demo/links', component: () => import('pages/Links.vue') },
          { path: '/demo/tasklists', component: () => import('pages/TaskLists.vue') },
          { path: '/demo/images', component: () => import('pages/Images.vue') },
          { path: '/demo/emojies', component: () => import('pages/Emojies.vue') },
          { path: '/demo/subsuper', component: () => import('pages/SubSuperScript.vue') },
          { path: '/demo/footnotes', component: () => import('pages/Footnotes.vue') },
          { path: '/demo/deflists', component: () => import('pages/DefLists.vue') },
          { path: '/demo/abbreviations', component: () => import('pages/Abbreviations.vue') },
          { path: '/demo/mark', component: () => import('pages/Mark.vue') },
          { path: '/demo/insert', component: () => import('pages/Insert.vue') },
          { path: '/demo/containers', component: () => import('pages/Containers.vue') },
          { path: '/demo/editor', component: () => import('pages/Editor.vue') }
        ]

      }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
