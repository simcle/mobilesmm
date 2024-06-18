<template>
    <div class="p-3">
        <div class="grid grid-cols-2 p-3 bg-gray-900 rounded divide-x divide-gray-800 mb-3">
            <div class="text-center">
                <div class="font-semibold">Debit J1</div>
                <div v-if="sensor">
                    <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                        <div :key="sensor.debit_1" class="text-2xl font-semibold text-cyan-500">{{parseFloat(sensor.debit_1).toFixed(2)}}</div>
                    </transition>
                </div>
                <div class="grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_debit_1 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_debit_1 || 0.00}}</div>
                    </div>
                </div>
            </div>
            <div class="text-center">
                <div class="font-smibold">Debit J2</div>
                <div v-if="sensor">
                    <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                        <div :key="sensor.debit_2" class="text-2xl font-semibold text-purple-500">{{parseFloat(sensor.debit_2).toFixed(2)}}</div>
                    </transition>
                </div>
                <div class="grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_debit_2 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_debit_2 || 0.00}}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- COD -->
        <div class="bg-gray-900 rounded p-3 mb-3">
            <div class="font-semibold">COD</div>
            <div class="grid grid-cols-5 items-center text-orange-500 py-1 border-b border-gray-800">
                <div class="col-span-1">
                    J1
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_cod_j1 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_cod_j1 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.cod_J1" class="text-xl font-semibold">{{parseFloat(sensor.cod_J1).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center py-1 border-b border-gray-800" style="color: rgb(236, 72, 153);">
                <div class="col-span-1">
                    J2
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_cod_j2 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_cod_j2 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.cod_J2" class="text-xl font-semibold">{{parseFloat(sensor.cod_J2).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center border-b border-gray-800" style="color: rgb(132, 204, 22);">
                <div class="col-span-1">
                    2B
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_cod_2 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_cod_2 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.cod_2" class="text-xl font-semibold">{{parseFloat(sensor.cod_2).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center py-1 border-b border-gray-800" style="color: rgb(6, 182, 212);">
                <div class="col-span-1">
                    1C
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_cod_3 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_cod_3 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.cod_3" class="text-xl font-semibold">{{parseFloat(sensor.cod_3).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center py-1 border-b border-gray-800" style="color: rgb(139, 92, 246);">
                <div class="col-span-1">
                    2C
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_cod_4 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_cod_4 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.cod_4" class="text-xl font-semibold">{{parseFloat(sensor.cod_4).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <!-- DO -->
        <div class="bg-gray-900 rounded p-3 mb-3">
            <div class="font-semibold">DO</div>
            <div class="grid grid-cols-5 items-center text-orange-500 py-1 border-b border-gray-800">
                <div class="col-span-1">
                    2B
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_do_2 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_do_2 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                   <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.do_4" class="text-xl font-semibold">{{parseFloat(sensor.do_2).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center py-1 border-b border-gray-800" style="color: rgb(236, 72, 153);">
                <div class="col-span-1">
                    1C
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_do_3 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_do_3 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.do_4" class="text-xl font-semibold">{{parseFloat(sensor.do_3).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center border-b border-gray-800" style="color: rgb(132, 204, 22);">
                <div class="col-span-1">
                    2C
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_do_4 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_do_4 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right relative overflow-hidden">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.do_4" class="text-xl font-semibold">{{parseFloat(sensor.do_4).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>

        <div class="bg-gray-900 rounded p-3 mb-16">
            <div class="grid grid-cols-5 items-center text-orange-500 pb-1 border-b border-gray-800">
                <div class="col-span-1">
                    pH J1
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_ph_1 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_ph_1 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.ph_1" class="text-xl font-semibold">{{parseFloat(sensor.ph_1).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center text-red-500 py-1 border-b border-gray-800">
                <div class="col-span-1">
                    Temp J1
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_temp_1 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_temp_1 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.temp_1" class="text-xl font-semibold">{{parseFloat(sensor.temp_1).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 text-purple-500 items-center border-b border-gray-800">
                <div class="col-span-1">
                    NH3N J1
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_nh3n_1 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_nh3n_1 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.nh3n_1" class="text-xl font-semibold">{{parseFloat(sensor.nh3n_1).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="grid grid-cols-5 items-center text-blue-500 border-b border-gray-800">
                <div class="col-span-1">
                    TSS J1
                </div>
                <div class=" col-span-2 grid grid-cols-2 text-xs">
                    <div class="text-center">
                        <div class="text-gray-400">Rata-rata</div>
                        <div class="text-green-500">{{avg.avg_tss_1 || 0.00}}</div>
                    </div>
                    <div class="text-center">
                        <div class="text-gray-400">Puncak</div>
                        <div class="text-red-500">{{avg.max_tss_1 || 0.00}}</div>
                    </div>
                </div>
                <div class="col-span-2 text-right">
                    <div v-if="sensor">
                        <transition enter-active-class="animate__animated animate__faster animate__flash" mode="out-in">
                            <div :key="sensor.tss_1" class="text-xl font-semibold">{{parseFloat(sensor.tss_1).toFixed(2)}}</div>
                        </transition>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { modbus } from '../db'
import {useDatabaseObject} from 'vuefire'
import {computed, onMounted, ref} from 'vue'
import axios from 'axios'
export default {
    setup () {
        const sensorSource = computed(() => modbus)
        const sensor = useDatabaseObject(sensorSource)
        onMounted(() => {
            getData()
        })
        const avg = ref('')
        const getData = () => {
            axios.get('/')
            .then(res => {
                avg.value = res.data.avg
            })
        }
        return {
            sensor,
            avg
        }
    }
}
</script>

<style scoped>
    .faster {
          --animate-duration: 0.1s;
    }
</style>