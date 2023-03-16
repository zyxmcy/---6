import ech1 from './data/rws1'
import ech2 from './data/rws2'
import ech3 from './data/rws3'
import ech4 from './data/rws4'
import {ech5_1, ech5_2} from './data/rws5'

let ech1_data = await ech1()
let ech2_data = await ech2()
let ech3_data = await ech3()
let ech4_data = await ech4()
let ech5_data_1 = await ech5_1()
let ech5_data_2 = await ech5_2()


export const option1 = {
    legend:{

    },
    xAxis:{
        type:'',
        data:[...new Set(ech1_data.ech_data_dj.map(x=>x.machineName))]
    },
    yAxis:{
        type:'value'
    },
    series: [
        {
            type: 'bar',
            name: "运行",
            data: ech1_data.ech_data_yx.map(x=>x.miao)
        },
        {
            type: 'bar',
            name: "待机",
            data: ech1_data.ech_data_dj.map(x=>x.miao)
        },
        {
            type: 'bar',
            name: "离线",
            data: ech1_data.ech_data_lx.map(x=>x.miao)
        },
    ]
}
console.log("option1===========================");
console.log(option1.xAxis.data);
console.log(option1.series[0].data);

export const option2 = {
    xAxis:{
        type:'',
        data:ech2_data.map(x=>`${x.machineName}_${x.changeRecordState}`)
    },
    yAxis:{
        type:'value'
    },
    series: [
        {
            type: 'bar',
            data: ech2_data.map(x=>(x.miao/x.timer).toFixed(2))
        }
    ]
}
console.log("option2=====================");
console.log(option2.xAxis.data);
console.log(option2.series[0].data);
export const option3 = {
    xAxis:{
        type:'',
        data:ech3_data.map(x=>`${x.machineName}_${x.changeStartTime}_${x.changeRecordState}`)
    },
    yAxis:{
        type:'value'
    },
    series: [
        {
            type: 'bar',
            data: ech3_data.map(x=>x.miao)
        }
    ]
}
console.log("option3===========");
console.log(option3.xAxis.data);
console.log(option3.series[0].data);
export const option4 = {
    yAxis:{
        type:'',
        data:ech4_data.map(x=>`${x.machineName}_${x.produceCodeStartTime}`)
    },
    xAxis:{
        type:'value'
    },
    series: [
        {
            type: 'bar',
            data: ech4_data.map(x=>x.total)
        }
    ]
}
console.log("option4============================");
console.log(option4.yAxis.data);
console.log(option4.series[0].data);
export const option5 = {
    xAxis:{
        type:'',
        data:ech5_data_1.map(x=>`${x.machineFactory}_${x.machineName}_${x.produceCodeStartTime}`)
    },
    yAxis:{
        type:'value'
    },
    series: [
        {
            type: 'bar',
            data: ech5_data_1.map(x=>(x.total/x.timer))
        },
        {
            type: 'line',
            data: [147228.70588235295, 147228.70588235295, 73864, 73864, 147228.70588235295, 65548.5]
        },
    ]
}
console.log("option5==================");
console.log(option5.xAxis.data);
console.log(option5.series[0].data);