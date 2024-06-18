<template>
    <div>
        <div class="bg-gray-900 p-3 mb-5">
            <div class="flex items-center">
                <div class="border p-2 h-14 w-14 flex items-center justify-center rounded-full"><i class="ph ph-user" style="font-size: 30px"></i></div>
                <div class="ml-5">
                    <div class="text-left">---</div>
                    <div class="text-left">---</div>
                </div>
            </div>
        </div>
        <div class="p-5">
            <button @click="signOut" class="bg-red-500 h-12 rounded w-full text-red-50">Keluar</button>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
export default {
    setup () {
        const store = useStore()
        const router = useRouter()
        const signOut = async () => {
			await store.dispatch('auth/logout')
			.then(() => {
				router.push('/login')
			})
		}

        return {
            signOut
        }
    }
}
</script>