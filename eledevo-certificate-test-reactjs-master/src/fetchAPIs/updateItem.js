export default function updateItem(data){
    return new Promise((resolve,reject)=>{
        const url='http://localhost:3001/tasks/'+ data.id
        const config={  
            method:'PUT',
            headers:{'Content-Type':'application/json'},
            body: JSON.stringify({name: data.name})
        }
        fetch(url,config)
        .then(res=>res.json())
        .then(res=>resolve(res))
        .catch(error=>reject(error))
    })
}