export default function getItem(){
    return new Promise((resolve,reject)=>{
        const url='http://localhost:3001/tasks/'
        fetch(url,{
            method:'GET'
        })
        .then((resolve)=>resolve.json())
        .then((res)=>{
            resolve(res)
            console.log(res);
        })
        .catch((error)=>{
            reject(error)
        })
    })
}