import http from'../../../api/index'
// import '../../../mock/index'
import miao from '../../../utils/miao'


export default async function ech1() {
    let ech_data_yx = []
    let ech_data_lx = []
    let ech_data_dj = []
    let {data} = await http("/api/machine/getIndustrial", "GET")
    const res = data
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
        if(dist.map(x=>x.changeRecordState).indexOf("运行") == -1){
            dist.push({
                machineName: ri.machineName,
                changeRecordState:"运行",
                miao:0
            })

        }
        if(dist.map(x=>x.changeRecordState).indexOf("离线") == -1){
            dist.push({
                machineName: ri.machineName,
                changeRecordState:"离线",
                miao:0
            })
        }
        if(dist.map(X=>X.changeRecordState).indexOf("待机") == -1){
            dist.push({
                machineName: ri.machineName,
                changeRecordState:"待机",
                miao:0
            })
        }
        // console.log(dist);
        for (let n = 0; n < dist.length; n++) {
            const dn = dist[n];
            if(dn.changeRecordState == "运行"){
                ech_data_yx.push(dn)
            }else if(dn.changeRecordState=="离线"){
                ech_data_lx.push(dn)
            }else if(dn.changeRecordState=="待机"){
                ech_data_dj.push(dn)
            }
        }
    }
    // console.log(ech_data_yx);
    // console.log(ech_data_dj);
    // console.log(ech_data_lx);
    return {ech_data_dj, ech_data_lx, ech_data_yx}
}

