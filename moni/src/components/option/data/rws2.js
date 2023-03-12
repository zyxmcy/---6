import http from'../../../api/index'
import '../../../mock/index'
import miao from '../../../utils/miao'


export default async function ech2() {
    const ech_data = []
    let {data} = await http("/machine/getIndustrial", "GET")
    const res = data.data
    // console.log(res);
    for (let i = 0; i < res.length; i++) {
        const ri = res[i];
        var map = {}, dist = []
        for (let j = 0; j < ri.showFactChangeRecordList.length; j++) {
            const rj = ri.showFactChangeRecordList[j];
            if(rj.changeRecordState == "运行"){
                if (!map[rj.changeRecordState]) {
                    map[rj.changeRecordState] = rj
                    dist.push({
                        machineName:ri.machineName,
                        changeRecordState:rj.changeRecordState,
                        miao:miao(rj.changeEndTime, rj.changeStartTime),
                        timer:1
                    })
                }else{
                    for (let m = 0; m < dist.length; m++) {
                        const dm = dist[m];
                        dm.miao+=miao(rj.changeEndTime, rj.changeStartTime),
                        dm.timer+=1
                    }
                }
            }
        }
        // console.log(dist);
        ech_data.push(dist[0] ? dist[0] : {machineName:ri.machineName,changeRecordState:"运行",miao:0,timer:1})
    }
    // console.log(ech_data);
    return ech_data
}

