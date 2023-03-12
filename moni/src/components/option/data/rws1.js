import http from'../../../api/index'
import '../../../mock/index'
import miao from '../../../utils/miao'


export default async function ech1() {
    let ech_data = []
    let {data} = await http("/machine/getIndustrial", "GET")
    const res = data.data
    // console.log(res);
    for (let i = 0; i < res.length; i++) {
        const ri = res[i];
        var map = {}, dist = []
        for (let j = 0; j < ri.showFactChangeRecordList.length; j++) {
            const rj = ri.showFactChangeRecordList[j];
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
                    if(dm.changeRecordState == rj.changeRecordState){
                        dm.miao += miao(rj.changeEndTime, rj.changeStartTime)
                        dm.timer +=1
                    }
                }
            }
        }
        // console.log(dist);
        for (let n = 0; n < dist.length; n++) {
            const dn = dist[n];
            ech_data.push(dn)
        }
    }
    return ech_data
}

