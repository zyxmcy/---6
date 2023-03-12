import axios from 'axios'

export default (url, method)=>{
    return new Promise((resolve, reject)=>{
        axios({
            method,
            url
        }).then((res)=>{
            resolve(res.data)
        }).catch((err)=>{
            reject(err)
        })
    })
}