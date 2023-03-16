import http from'../../../api/index'
// import '../../../mock/index'
import miao from '../../../utils/miao'


export default async function ech3() {
    const ech_data = []
    let {data} = await http("/api/machine/getIndustrial", "GET")
    // console.log(data);
    const res = data
    // console.log(res);
    for (let i = 0; i < res.length; i++) {
        const ri = res[i];
        var map = {}, dist = []
        for (let j = 0; j < ri.showFactProduceRecords.length; j++) {
            const rj = ri.showFactProduceRecords[j];
            const produceCodeStartTime = rj.produceCodeStartTime.split(" ")[0]
            if(!map[produceCodeStartTime]){
                map[produceCodeStartTime] = rj
                dist.push({
                    machineName:ri.machineName,
                    produceCodeStartTime:produceCodeStartTime,
                    total:rj.produceTotalout,
                    timer:1
                })
            }else{
                for (let m = 0; m < dist.length; m++) {
                    const dm = dist[m];
                    if(dm.produceCodeStartTime == produceCodeStartTime){
                        dm.total+=rj.produceTotalout
                        dm.timer+=1
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
