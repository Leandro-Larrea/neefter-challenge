export const cleanProperties = (obj)=>{
    let newObj = {}
    Object.keys(obj).filter(e => obj[e].length).forEach(e=> newObj[e]=obj[e])
    return newObj
}

export const generateTimestamp =(str)=>{
    const date = new Date(str)
    const timestamp = date.getTime();
    return timestamp
}