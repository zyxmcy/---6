import http from'../../../api/index'
import '../../../mock/index'
import miao from '../../../utils/miao'


export default async function ech3() {
    const ech_data = []
    let {data} = await http("/machine/getIndustrial", "GET")
    const res = data.data
    // console.log(res);
    for (let i = 0; i < res.length; i++) {
        const ri = res[i];
        var map = {}, dist = []
        if(ri.machineName == "OP160"){
            for (let j = 0; j < ri.showFactChangeRecordList.length; j++) {
                const rj = ri.showFactChangeRecordList[j];
                if(rj.changeRecordState == "运行"){
                    const startTime = rj.changeStartTime.split(" ")[0]
                    if(!map[startTime]){
                        map[startTime] = rj
                        dist.push({
                            machineName:ri.machineName,
                            changeStartTime:startTime,
                            changeRecordState:rj.changeRecordState,
                            miao:miao(rj.changeEndTime, rj.changeStartTime),
                            timer:1
                           
                        })
                    }else{
                        for (let m = 0; m < dist.length; m++) {
                            const dm = dist[m];

                            // console.log(dm.changeStartTime == rj.changeStartTime);
                            if(dm.changeStartTime == startTime){
                                dm.timer+=1
                                dm.miao+=miao(rj.changeEndTime, rj.changeStartTime)
                            }
                        }
                    }
                }
            }
        }
        // console.log(`ech3333333333${dist}`);
        for (let n = 0; n < dist.length; n++) {
            const dn = dist[n];
            ech_data.push(dn)
        }
    }
    // console.log(ech_data);
    return ech_data
}
