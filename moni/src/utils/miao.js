export default (endTime, startTime)=>{
    const end = new Date(endTime)
    const start = new Date(startTime)
    return (end-start)
}