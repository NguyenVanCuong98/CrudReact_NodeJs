import { LIMIT } from "../constants";

export default function searchPagination(data){
    return new Promise((resolve,reject)=>{
        const url=`http://localhost:3001/tasks/searchPagination?page=${data.activePage}&limit=${LIMIT}&nameSearch=${data.nameSearch}`
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