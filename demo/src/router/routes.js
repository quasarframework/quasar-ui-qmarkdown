
const routes = [
  {
    path: '/',
    component: () => import('layouts/MyLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue'),
        children: [
          { path: '/heading', component: () => import('pages/Heading.vue') },
          { path: '/titles', component: () => import('pages/Titles.vue') },
          { path: '/typographic', component: () => import('pages/Typographic.vue') },
          { path: '/emphasis', component: () => import('pages/Emphasis.vue') },
          { path: '/rules', component: () => import('pages/Rules.vue') },
          { path: '/blockquotes', component: () => import('pages/Blockquotes.vue') },
          { path: '/lists', component: () => import('pages/Lists.vue') },
          { path: '/code', component: () => import('pages/Code.vue') },
          { path: '/tables', component: () => import('pages/Tables.vue') },
          { path: '/links', component: () => import('pages/Links.vue') },
          { path: '/tasklists', component: () => import('pages/TaskLists.vue') },
          { path: '/images', component: () => import('pages/Images.vue') },
          { path: '/emojies', component: () => import('pages/Emojies.vue') },
          { path: '/subsuper', component: () => import('pages/SubSuperScript.vue') },
          { path: '/footnotes', component: () => import('pages/Footnotes.vue') },
          { path: '/deflists', component: () => import('pages/DefLists.vue') },
          { path: '/abbreviations', component: () => import('pages/Abbreviations.vue') },
          { path: '/mark', component: () => import('pages/Mark.vue') },
          { path: '/insert', component: () => import('pages/Insert.vue') },
          { path: '/containers', component: () => import('pages/Containers.vue') },
          { path: '/editor', component: () => import('pages/Editor.vue') }
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
