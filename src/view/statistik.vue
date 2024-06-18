<template>
    <div class="mb-16 bg-black">
        <ul class="flex items-center justify-evenly p-3 border-b border-gray-800">
            <li>
                <button @click="filter = '24 Jam'" :class="{'bg-cyan-500': filter == '24 Jam'}" class="py-1.5 px-3 rounded">1H</button>
            </li>
            <li>
                <button @click="filter = '7 Hari'" :class="{'bg-cyan-500': filter == '7 Hari'}" class="py-1.5 px-3 rounded">1M</button>
            </li>
            <li>
                <button @click="filter = '30 Hari'" :class="{'bg-cyan-500': filter == '30 Hari'}" class="py-1.5 px-3 rounded">1B</button>
            </li>
            <li>
                <button @click="filter = '90 Hari'" :class="{'bg-cyan-500': filter == '90 Hari'}" class="py-1.5 px-3 rounded">3B</button>
            </li>
            <li>
                <button @click="filter = '1 Tahun'" :class="{'bg-cyan-500': filter == '1 Tahun'}" class="py-1.5 px-3 rounded">1T</button>
            </li>
        </ul>
        <div class="p-3 space-y-3">
            <div class="rounded bg-gray-900 p-3">
                <canvas id="debit"></canvas>
            </div>
            <div class="rounded bg-gray-900 p-3">
                <canvas id="pH"></canvas>
            </div>
            <div class="rounded bg-gray-900 p-3">
                <canvas id="temp"></canvas>
            </div>
            <div class="rounded bg-gray-900 p-3">
                <canvas id="cod"></canvas>
            </div>
            <div class="rounded bg-gray-900 p-3">
                <canvas id="myDo"></canvas>
            </div>
            <div class="rounded bg-gray-900 p-3">
                <canvas id="myNh3n"></canvas>
            </div>
            <div class="rounded bg-gray-900 p-3">
                <canvas id="myTss"></canvas>
            </div>
        </div>
    </div>
</template>

<script>
import ChartJS from 'chart.js/auto'
import { onMounted, ref, watch, nextTick } from '@vue/runtime-core'
import axios from 'axios'
export default {
    setup () {
        const filter = ref('24 Jam')
        const hoizontalDottedLine = {
            id: 'hoizontalDottedLine',
            beforeDatasetsDraw(chart, args, options) {
                const { ctx, chartArea: { top, right, bottom, left, width, height}, scales: { x, y }} = chart
                ctx.save()

                ctx.lineWidth = 0.3
                ctx.strokeStyle = 'red'
                ctx.setLineDash([10,5])
                ctx.strokeRect(left, y.getPixelForValue(options.maxValue), width, 0)
               
                
                ctx.strokeStyle = 'gray'
                ctx.setLineDash([10,5])
                ctx.strokeRect(left, y.getPixelForValue(options.minValue), width, 0)
                ctx.restore()
            }
        }
        const tooltipLine = {
			id: 'tooltipLine',
			beforeDraw: chart => {
				if(chart.tooltip._active && chart.tooltip._active.length) {
					const ctx = chart.ctx
					ctx.save()
					const activePoint = chart.tooltip._active[0]
					ctx.beginPath()
					
					ctx.moveTo(activePoint.element.x, chart.chartArea.top)
					ctx.lineTo(activePoint.element.x, chart.chartArea.bottom)
					ctx.lineWidth = 0.5
					ctx.strokeStyle = 'gray'
					ctx.stroke()
					ctx.restore()
				}
			}
		}
        const options = {
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    labels: {
                        color: 'white'
                    },
                    position: 'top',
                },
                hoizontalDottedLine: {
                    minValue: 0,
                    maxValue: 0
                }
            },
            scales: {
                x: {
                    labels: false,
                    ticks: {
                        color: 'rgb(156,163,168)',
                        display: false,
                        font: {
                            size: 9
                        }
                    },
                    grid: {
                        color: 'rgb(55,65,81)',
                        display: false
                    }
                },
                y: {
                    grace: '1%',
                    ticks: {
                        color: 'rgb(156,163,168)',
                        font: {
                            size: 10
                        }
                    },
                    grid: {
                        color: 'rgb(55,65,81)',
                        display: true
                    }
                }
            }
        }
        const timeData = []
        const phData = []
        const tempData = []
        const codDataJ1 = []
        const codDataJ2 = []
        const codData2 = []
        const codData3 = []
        const codData4 = []
        const doData1 = []
        const doData2 = []
        const doData3 = []
        const doData4 = []
        const tssData = []
        const nh3nData = []
        const debtiDataJ1 = []
        const debtiDataJ2 = []
        let myPH, myTemp, myDebit, myCod, myDo, myTss, myNh3n
        onMounted (() => {
            const ctxDebit = document.getElementById('debit')
            myDebit = new ChartJS(ctxDebit, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'DEBIT J1',
                            data: debtiDataJ1,
                            borderColor: '#06b6d4',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                        {
                            label: 'DEBIT J2',
                            data: debtiDataJ2,
                            borderColor: '#8b5cf6',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        }
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: options
            })

            const ctxPH = document.getElementById('pH')
            myPH = new ChartJS(ctxPH, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'pH',
                            data: phData,
                            borderColor: 'rgb(16,185,140, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                    ]
                },
                options: options,
                plugins: [hoizontalDottedLine, tooltipLine]
            })

            const ctxTemp = document.getElementById('temp')
            myTemp = new ChartJS(ctxTemp, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'Temperatur',
                            data: tempData,
                            borderColor: 'rgb(239,68,102, 0.7)',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                    ]
                },
                plugins: [hoizontalDottedLine, tooltipLine],
                options: options,
            })

            const ctxCod = document.getElementById('cod')
            myCod = new ChartJS(ctxCod, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'COD J1',
                            data: codDataJ1,
                            borderColor: '#f97316',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                        {
                            label: 'COD J2',
                            data: codDataJ2,
                            borderColor: '#f97316',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                        {
                            label: 'COD 2B',
                            data: codData2,
                            borderColor: '#84cc16',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                        {
                            label: 'COD 1C',
                            data: codData3,
                            borderColor: '#06b6d4',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                        {
                            label: 'COD 2C',
                            data: codData4,
                            borderColor: '#8b5cf6',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                    ]
                },
                options: options,
                plugins: [hoizontalDottedLine, tooltipLine]
            })

            const ctxDo = document.getElementById('myDo')
            myDo = new ChartJS(ctxDo, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'DO 2B',
                            data: doData2,
                            borderColor: '#f97316',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                        {
                            label: 'DO 1C',
                            data: doData3,
                            borderColor: '#f97316',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                        {
                            label: 'DP 2C',
                            data: doData4,
                            borderColor: '#84cc16',
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                    ]
                },
                options: options,
                plugins: [hoizontalDottedLine, tooltipLine]
            })

            const ctxNh3n = document.getElementById('myNh3n')
            myNh3n = new ChartJS(ctxNh3n, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'NH3N',
                            data: nh3nData,
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                    ]
                },
                options: options,
                plugins: [hoizontalDottedLine, tooltipLine]
            })

            const ctxTss = document.getElementById('myTss')
            myTss = new ChartJS(ctxTss, {
                type: 'line',
                data: {
                    labels: timeData,
                    datasets: [
                        {
                            label: 'TSS',
                            data: tssData,
                            borderWidth: '1',
                            pointRadius: '0',
                            pointHoverRadius: '0',
                        },
                    ]
                },
                options: options,
                plugins: [hoizontalDottedLine, tooltipLine]
            })
            getThreshold()
            getData()
        }) 

        watch(filter, () => {
            timeData.splice(0, timeData.length)
            phData.splice(0, phData.length)
            tempData.splice(0, tempData.length)
            codDataJ1.splice(0, codDataJ1.length)
            codDataJ2.splice(0, codDataJ2.length)
            codData2.splice(0, codData2.length)
            codData3.splice(0, codData3.length)
            codData4.splice(0, codData4.length)
            doData1.splice(0, doData1.length)
            doData2.splice(0, doData2.length)
            doData3.splice(0, doData3.length)
            doData4.splice(0, doData4.length)
            tssData.splice(0, tssData.length)
            nh3nData.splice(0, nh3nData.length)
            debtiDataJ1.splice(0, debtiDataJ1.length)
            debtiDataJ2.splice(0, debtiDataJ2.length)
            myPH.update()
            myTemp.update()
            myCod.update()
            myDo.update()
            myTss.update()
            myNh3n.update()
            myDebit.update()
            getData()
        })

        const getThreshold = () => {
            axios.get('/thresholds')
            .then(async (res) => {
                const data = res.data
                myPH.options.plugins.hoizontalDottedLine.minValue = data.min_ph_1
                myPH.options.plugins.hoizontalDottedLine.maxValue = data.max_ph_1
                myTemp.options.plugins.hoizontalDottedLine.minValue = data.min_temp_1
                myTemp.options.plugins.hoizontalDottedLine.maxValue = data.max_temp_1
                myCod.options.plugins.hoizontalDottedLine.minValue = data.min_cod_1
                myCod.options.plugins.hoizontalDottedLine.maxValue = data.max_cod_1
                myDo.options.plugins.hoizontalDottedLine.minValue = data.min_do_1
                myDo.options.plugins.hoizontalDottedLine.maxValue = data.max_do_1
                myTss.options.plugins.hoizontalDottedLine.minValue = data.min_tss_1
                myTss.options.plugins.hoizontalDottedLine.maxValue = data.max_tss_1
                myNh3n.options.plugins.hoizontalDottedLine.minValue = data.min_nh3n_1
                myNh3n.options.plugins.hoizontalDottedLine.maxValue = data.max_nh3n_1
                myDebit.options.plugins.hoizontalDottedLine.minValue = data.min_debit_1
                myDebit.options.plugins.hoizontalDottedLine.maxValue = data.max_debit_1
                await nextTick()
                myPH.update()
                myTemp.update()
                myCod.update()
                myDo.update()
                myTss.update()
                myNh3n.update()
                myDebit.update()
            })
        }

        const getData = () => {
            axios.get('/statistics', {
                params: {
                    filter: filter.value
                }
            })
            .then(async (res) => {
                const data = res.data
                for(let i = 0; i < data.length; i++) {
                    const el = data[i]
                    timeData.push(el.datetime)
                    phData.push(el.ph_1)
                    tempData.push(el.temp_1)
                    codDataJ1.push(el.cod_J1)
                    codDataJ2.push(el.cod_J2)
                    codData2.push(el.cod_2)
                    codData3.push(el.cod_3)
                    codData4.push(el.cod_4)
                    doData1.push(el.do_1)
                    doData2.push(el.do_2)
                    doData3.push(el.do_3)
                    doData4.push(el.do_4)
                    tssData.push(el.tss_1)
                    nh3nData.push(el.nh3n_1)
                    debtiDataJ1.push(el.debit_1)
                    debtiDataJ2.push(el.debit_2)
                }
                await nextTick()
                myPH.update()
                myTemp.update()
                myCod.update()
                myDo.update()
                myTss.update()
                myNh3n.update()
                myDebit.update()
            })
        }

        return {
            filter
        }
    }
}
</script>