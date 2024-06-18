<template>
    <div class="fixed inset-0 z-10 bg-black flex items-center justify-center px-5 h-screen">
        <div class=" w-full text-gray-400">
            <div class="text-center mb-10">
                <div><i class="ph ph-user" style="font-size:70px"></i></div>
                <div class="text-lg font-semibold">MASUK KE AKUN ANDA</div>
                <div>Masukkan kredensial Anda di bawah ini</div>
            </div>
            <form @submit.prevent="onSubmit">
                <div class="mb-5">
                    <input v-model="form.email" type="email" name="user_email" @keydown="err.email=''" class="w-full h-12 bg-gray-900 border border-gray-900 px-3 placeholder-gray-600" placeholder="email">
                    <div class="text-red-500 text-xs mt-1">{{err.email}}</div>
                </div>
                <div class="mb-5">
                    <input v-model="form.password" type="password" name="user_password" @keydown="err.password = ''" class="w-full h-12 bg-gray-900 border border-gray-900 px-3 placeholder-gray-600" placeholder="sandi">
                    <div class="text-red-500 text-xs mt-1">{{err.password}}</div>
                </div>
                <div>
                    <button class="h-12 w-full bg-blue-500 rounded text-blue-50">Masuk</button>
                </div>
            </form>
            <div class="text-center mt-10 text-gray-500">
                <div>PT. Sarana Makin Mulia</div>
                <div class="text-xs">@2024 Indo Haromonis Abadi | iha.co.id</div>
            </div>
        </div>
        <div v-if="isLoading" class="flex items-center justify-center fixed bg-gray-900 inset-0 bg-opacity-50 backdrop-blur-[2px] h-screen">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default {
    setup () {
        const store = useStore()
        const router = useRouter()
        const form = ref({
            email: '',
            password: ''
        })
        const err = ref({
            email: '',
            password: ''
        })
        const isLoading = ref(false)
        const onSubmit = () => {
            if(!form.value.email) {
                err.value.email = 'Eamil haurs disiri'
            }
            if(!form.value.password) {
                err.value.password = 'Kata sandi harus diisi'
            }
            if(form.value.email && form.value.password) {
                isLoading.value = true
                store.dispatch('auth/login', form.value)
                .then(() => {
                    isLoading.value = false
                    router.push('/')
                })
                .catch(error => {
                    isLoading.value = false
                    const errResponse = error.response.data
                    if(errResponse == 'Email tidak ditemukan') {
                        err.value.email = errResponse
                    } else {
                        err.value.password = errResponse
                    }
                })
            }
        }
        return {
            form,
            err,
            isLoading,
            onSubmit
        }
    }
}
</script>