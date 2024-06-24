import SummeryApi from "../common"
import {toast} from 'react-toastify'

const addToCard =  async(e, id) => {
    e?.stopPropagation()
    e.preventDefault()

    const response= await fetch(SummeryApi.addToCartProduct.url,{
        method : SummeryApi.addToCartProduct.method,
        credentials : "include",
        headers: {
            "content-type": "application/json"
        },
        body:JSON.stringify({productId : id})
    })

    const json = await  response.json()
    // console.log("json", json)
    
    if(json.success){
        toast.success(json.message)
    }

    if(json.error){
        toast.error(json.message)
    }


    return json



   

}


export default addToCard