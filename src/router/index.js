import { createWebHistory, createRouter } from "vue-router";
import store from '../store'

const routes = [
    {
        path: '/',
        name: 'Beranda',
        component: () => import('../view/beranda.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/statistik',
        name: 'Statistik',
        component: () => import('../view/statistik.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/peringatan',
        name: 'Peringatan',
        component: () => import('../view/peringatan.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/laporan',
        name: 'Laporan',
        component: () => import('../view/laporan.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/akun',
        name: 'Akun',
        component: () => import('../view/akun.vue'),
        meta: {
            auth: true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../view/login.vue')
    },
]

const router = createRouter({
    linkActiveClass: 'active',
    linkExactActiveClass: 'active',
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const token = store.getters['auth/token']
    if(to.meta.auth && !token) next({name: 'Login'})
    else if(!to.meta.auth && token) next({name: 'Beranda'})
    else next()
})

export default router