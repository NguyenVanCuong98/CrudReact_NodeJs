export default function addItem(name){
    return new Promise((resolve,reject)=>{
        const url='http://localhost:3001/tasks/'
        const config={
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify(name)
        }
        fetch(url,config)
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(error=>reject(error))
    })
}