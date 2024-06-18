import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import axios from 'axios'
import router from './router'
import store  from './store'

import './store/subscribe'

import { VueFire } from 'vuefire'
import { firebaseApp } from './db.js'

import "@phosphor-icons/web/regular"
import 'animate.css'

axios.defaults.baseURL = import.meta.env.VITE_API_URL

axios.interceptors.response.use(
    response => {
        return response
    },
    async err => {
        const {response: {status}} = err
        if(status == 403) {
            localStorage.removeItem('token')
            localStorage.removeItem('refreshToken')
            store.commit('auth/SET_TOKEN', null)
            router.push('/login')
        }
        return Promise.reject(err)
    }
)
store.commit('auth/SET_TOKEN', localStorage.getItem('token'))
createApp(App).use(store).use(router).use(VueFire, {firebaseApp}).mount('#app')
