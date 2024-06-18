<template>
    <div id="content" class="h-screen overflow-scroll">
        <div class="fixed w-full bg-gray-900">
           <div class="flex items-center justify-between px-3 py-3">
                <div>
                    <button @click="modalTime = true" class="border border-gray-700 px-2 py-1 bg-gray-800 rounded-sm">
                        {{labelFilterTime}}
                        <i class="ph ph-caret-down ml-2"></i>
                    </button>
                </div>
                <div>
                    <button @click="modalFilter = true" class="border border-gray-700 px-2 py-1 bg-gray-800 rounded-sm">
                        Filter
                        <i class="ph ph-caret-down ml-2"></i>
                    </button>
                </div>
                <!-- <div>
                    <button class="border border-gray-700 px-2 py-1 bg-gray-800 rounded-sm">
                        Parameter
                        <i class="ph ph-caret-down ml-2"></i>
                    </button>
                </div> -->
            </div> 
        </div>
        <div class="pt-16 px-3 pb-20 h-screen">
            <table class="w-full">
                <thead>
                    <th class="px-2 py-3 bg-gray-800 text-left">Tanggal</th>
                    <th class="px-2 py-3 bg-gray-800 text-left">Parameter</th>
                    <th class="px-2 py-3 bg-gray-800 text-left">Nilai</th>
                </thead>
                <tbody class="divide-y divide-gray-800">
                    <tr v-for="(wr, i) in warnings" :key="i" :class="{'text-red-500': wr.threshold == 'max'}">
                        <td class="px-2 py-3">{{convDate(wr.insert_at)}}</td>
                        <td class="px-2 py-3">{{wr.parameter}}</td>
                        <td class="px-2 py-3">{{parseFloat(wr.value).toFixed(2)}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <modal :show="modalTime" @onClose="onCloseModalTime">
            <div class="bg-gray-900 rounded-t-2xl w-full">
                <div class="flex items-center p-2">
                    <button @click="onCloseModalTime" class="p-2"><i class="ph ph-x"></i></button>
                    <div class="font-semibold text-lg">Pilih Waktu</div>
                </div>
                <ul class="px-5 pt-5 divide-y divide-gray-700 border-b border-gray-700 mb-5">
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>Hari ini</div>
                            <div>
                                <input type="radio" name="tanggal" value="Hari ini" v-model="labelFilterTime">
                            </div>
                        </label>
                    </li>
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>Kemarin</div>
                            <div>
                                <input type="radio" name="tanggal" value="Kemarin" v-model="labelFilterTime">
                            </div>
                        </label>
                    </li>
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>7 Hari terakhir</div>
                            <div>
                                <input type="radio" name="tanggal" value="7 Hari terakhir" v-model="labelFilterTime">
                            </div>
                        </label>
                    </li>
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>30 Hari terakhir</div>
                            <div>
                                <input type="radio" name="tanggal" value="30 Hari terakhir" v-model="labelFilterTime">
                            </div>
                        </label>
                    </li>
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>Bulan ini</div>
                            <div>
                                <input type="radio" name="tanggal" value="Bulan ini" v-model="labelFilterTime">
                            </div>
                        </label>
                    </li>
                </ul>
                <div class="px-5 mb-5" v-show="onFilter">
                    <button @click="onGetFilterTime" class="py-2 bg-green-700 w-full rounded-sm">Terapkan</button>
                </div>
            </div>
        </modal>

        <modal :show="modalFilter" @onClose="onCloseModalFilter">
            <div class="bg-gray-900 rounded-t-2xl w-full">
                <div class="flex items-center p-2">
                    <button @click="onCloseModalFilter" class="p-2"><i class="ph ph-x"></i></button>
                    <div class="font-semibold text-lg">Pilih Filter</div>
                </div>
                <ul class="px-5 pt-5 divide-y divide-gray-700 border-b border-gray-700 mb-5">
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>Semu Ambang Batas</div>
                            <div>
                                <input type="radio" name="filter" value="" v-model="labelFilter">
                            </div>
                        </label>
                    </li>
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>Ambang Batas Minimal</div>
                            <div>
                                <input type="radio" name="filter" value="min" v-model="labelFilter">
                            </div>
                        </label>
                    </li>
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>Ambang Batas Maksimal</div>
                            <div>
                                <input type="radio" name="filter" id="maximal" value="max" v-model="labelFilter">
                            </div>
                        </label>
                    </li>
                </ul>
                <div class="px-5 mb-5" v-show="onFilter">
                    <button @click="onGetFilter" class="py-2 bg-green-700 w-full rounded-sm">Terapkan</button>
                </div>
            </div>
        </modal>

        <div v-if="isLoading" class=" fixed inset-0 bg-gray-800 bg-opacity-70 backdrop-blur-[2px] h-screen z-50 flex items-center justify-center">
            <div class="loader"></div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import Modal from '../components/Popup.vue'
import { nextTick, onMounted, onUnmounted } from '@vue/runtime-core'
import axios from 'axios'
export default {
    components: {Modal},
    setup () {
        const warnings = ref([])
        const page = ref(1)
        const isLoader = ref(false)
        const isLoading = ref(false)
        const isEnd = ref(false)

        const onFilter = ref(false)
        const modalTime = ref(false)
        const labelFilterTime = ref('Hari ini')
        const onCloseModalTime = () => {
            modalTime.value = false
            onFilter.value = false
        }
        const onGetFilterTime = async () => {
            modalTime.value = false
            onFilter.value = false
            page.value = 1
            warnings.value = []
            await nextTick()
            getData()
        }

        const filter = ref('')
        const labelFilter = ref('')
        const modalFilter = ref(false)
        const onCloseModalFilter = () => {
            modalFilter.value = false
            onFilter.value = false
        }
        const onGetFilter = async () => {
            modalFilter.value = false
            onFilter.value = false
            page.value = 1
            filter.value = labelFilter.value
            warnings.value = []
            await nextTick()
            getData()
        }
        onMounted(() => {
            document.getElementById('content').addEventListener('scroll', onScroll)
            getData()
        })
        onUnmounted(() => {
            document.getElementById('content').removeEventListener('scroll', onScroll)
        })

        const getData = () => {
            isLoading.value = true
            axios.get('/warnings', {
                params: {
                    label: labelFilterTime.value,
                    date: '',
                    filter: filter.value,
                    parameter: '',
                    page: page.value
                }
            })
            .then(res => {
                isLoading.value = false
                const data = res.data
                if(data.length > 0) {
                    isEnd.value = true
                } else {
                    isEnd.value = false
                }
                for (let i = 0; i < data.length; i++) {
                    const el = data[i];
                    warnings.value.push(el)
                }
            })
        }
        const showButton = ref(false)
        const onScroll = () => {
            const content = document.getElementById('content')
            const {scrollTop, scrollHeight, clientHeight} = content
            if(scrollTop + clientHeight + 0.5 >= scrollHeight && isEnd.value) {
                isLoading.value = true
                getData(page.value += 1)
            }
            if(scrollTop > 200) {
                showButton.value = true
            } else {
                showButton.value = false
            }
        }
        const convDate = (d) => {
            const date = new Date(d)
            const Y = date.getFullYear().toString().substr(-2)
            let M = date.getMonth() + 1
            let D = date.getDate()
            let h = date.getHours()
            let m = date.getMinutes()
            M = checkTime(M)
            D = checkTime(D)
            h = checkTime(h)
            m = checkTime(m)
            function checkTime (i) {
                if( i < 10) {
                    i = `0${i}`
                }
                return i
            }
            return `${D}/${M}/${Y} ${h}:${m}`
        }
        return {
            warnings,
            onFilter,
            modalTime,
            labelFilterTime,
            modalFilter,
            labelFilter,
            isLoading,
            onCloseModalTime,
            onGetFilterTime,
            onGetFilter,
            onCloseModalFilter,
            convDate
        }
    }
}
</script>