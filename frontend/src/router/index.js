import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/accueil',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/connexion',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/inscription',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },
  {
    path: '/profil',
    name: 'Profile',
    component: () => import('../views/Profile.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/groupomania',
    name: 'Dashboard',
    component: () => import('../views/Dashboard.vue'),
    meta: {
      auth: true,
    },
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some((record) => record.meta.auth)
  const user = JSON.parse(localStorage.getItem('groupomania:user'))
  const token = localStorage.getItem('groupomania:token')
  if (requiresAuth && (!user || !token)) {
    return next('/accueil')
  }
  next()
})

export default router
