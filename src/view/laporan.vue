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
                    <button @click="modalInterval = true" class="border border-gray-700 px-2 py-1 bg-gray-800 rounded-sm">
                        Interval
                        <i class="ph ph-caret-down ml-2"></i>
                    </button>
                </div>
            </div> 
        </div>
        <div class="pt-16 pb-16">
            <div v-for="(log, i) in loggers" :key="i" class=" bg-gray-900 rounded text-sm border border-gray-700 mb-3 mx-1.5">
                <div class="px-3 text-sm py-1 text-cyan-500">{{convDate(log.insert_at)}}</div>
                <div class="grid grid-cols-3 gap-5 px-2 py-1.5 bg-gray-800">
                    <div>
                        <table class="w-full">
                            <tr>
                                <td class="pr-1.5 text-gray-400">pH</td>
                                <td class="text-right">{{parseFloat(log.ph_1).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">Temp</td>
                                <td class="text-right">{{parseFloat(log.temp_1).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">TSS</td>
                                <td class="text-right">{{parseFloat(log.tss_1).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">NH3n</td>
                                <td class="text-right">{{parseFloat(log.nh3n_1).toFixed(2)}}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table class="w-full">
                            <tr>
                                <td class="pr-1.5 text-gray-400">COD J1</td>
                                <td class="text-right">{{parseFloat(log.cod_j1).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">COD J2</td>
                                <td class="text-right">{{parseFloat(log.cod_j2).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">COD 2B</td>
                                <td class="text-right">{{parseFloat(log.cod_2).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">COD 1C</td>
                                <td class="text-right">{{parseFloat(log.cod_3).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">COD 2C</td>
                                <td class="text-right">{{parseFloat(log.cod_4).toFixed(2)}}</td>
                            </tr>
                        </table>
                    </div>
                    <div>
                        <table class="w-full">
                            <tr>
                                <td class="pr-1.5 text-gray-400">DEB J1</td>
                                <td class="text-right">{{parseFloat(log.debit_1).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">DEB J2</td>
                                <td class="text-right">{{parseFloat(log.debit_2).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">DO 2B</td>
                                <td class="text-right">{{parseFloat(log.do_2).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">DO 1C</td>
                                <td class="text-right">{{parseFloat(log.do_3).toFixed(2)}}</td>
                            </tr>
                            <tr>
                                <td class="pr-1.5 text-gray-400">DO 2C</td>
                                <td class="text-right">{{parseFloat(log.do_4).toFixed(2)}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
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

        <modal :show="modalInterval" @onClose="onCloseModalInterval">
            <div class="bg-gray-900 rounded-t-2xl w-full">
                <div class="flex items-center p-2">
                    <button @click="onCloseModalTime" class="p-2"><i class="ph ph-x"></i></button>
                    <div class="font-semibold text-lg">Pilih Interval</div>
                </div>
                <ul class="px-5 pt-5 divide-y divide-gray-700 border-b border-gray-700 mb-5">
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>2 Menit</div>
                            <div>
                                <input type="radio" name="interval" value="2 menit" v-model="labelInterval">
                            </div>
                        </label>
                    </li>
                    <li class="py-3.5" @click="onFilter = true">
                        <label class="flex justify-between">
                            <div>1 Jam</div>
                            <div>
                                <input type="radio" name="interval" value="1 jam" v-model="labelInterval">
                            </div>
                        </label>
                    </li>
                </ul>
                <div class="px-5 mb-5" v-show="onFilter">
                    <button @click="onGetFilterInterval" class="py-2 bg-green-700 w-full rounded-sm">Terapkan</button>
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
        const loggers = ref([])
        const page = ref(1)
        const isLoading = ref(false)
        const isEnd = ref(false)

        const onFilter = ref(false)
        const modalTime = ref(false)
        const labelFilterTime = ref('Hari ini')
        const onGetFilterTime = async () => {
            modalTime.value = false
            onFilter.value = false
            page.value = 1
            loggers.value = []
            await nextTick()
            getData()
        }
        const onCloseModalTime = () => {
            modalTime.value = false
            onFilter.value = false
        }

        const modalInterval = ref(false)
        const labelInterval = ref('2 menit')
        const onGetFilterInterval = async () => {
            modalInterval.value = false
            onFilter.value = false
            page.value = 1
            loggers.value = []
            await nextTick()
            getData()
        }
        const onCloseModalInterval = () => {
            modalInterval.value = false
            onFilter.value = false
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
            axios.get('/loggers', {
                params: {
                    label: labelFilterTime.value,
                    date: '',
                    page: page.value,
                    filter: labelInterval.value
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
                    loggers.value.push(el)
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
            isLoading,
            loggers,
            modalTime,
            labelFilterTime,
            onFilter,
            modalInterval,
            labelInterval,
            onGetFilterTime,
            onCloseModalTime,
            onGetFilterInterval,
            onCloseModalInterval,
            convDate
        }
    }
}
</script>