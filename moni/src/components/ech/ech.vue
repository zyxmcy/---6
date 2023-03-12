<template>
       <div :id="uuid" class="container"></div> 
</template>
    
<script setup>
import * as echarts from 'echarts'
import { nextTick, onMounted, toRefs } from 'vue';
import { v4 } from "uuid";
const uuid = v4()

const {option} = defineProps({
    option:{
        type: Object,
        default: null
    }
})


function ech() {
    const myEcharts = echarts.init(document.getElementById(uuid))
    myEcharts.setOption(option)
}

onMounted(()=>{
    nextTick(()=>{
        ech()
    })
})
</script>
    
<style>
    .container{
        width: 90vw;
        height: 90vh;
    }
</style>