import { LIMIT } from "../constants";

export default function pagination(activePage){
    return new Promise((resolve,reject)=>{
        const url=`http://localhost:3001/tasks/pagination?page=${activePage}&limit=${LIMIT}`
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