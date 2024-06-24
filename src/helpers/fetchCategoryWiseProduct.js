import SummeryApi from "../common"

const fetchCategoryWiseProduct=async(category)=>{
    const response=  await fetch(SummeryApi.categoryWiseProduct.url,{
        method: SummeryApi.categoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({category:category})
    })

    const json = await response.json()

    return json
}


export default fetchCategoryWiseProduct