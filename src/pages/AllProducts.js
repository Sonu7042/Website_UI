import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummeryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {

  const [openUploadProduct, setOpenUploadProduct] = useState(false)

  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct=async()=>{
    const response= await fetch(SummeryApi.allProduct.url)
    const json= await response.json()
    setAllProduct(json?.data || [])

  }
  

  useEffect(()=>{
    fetchAllProduct()

  }, [])



  return (
    <div>

      <div className='bg-white  flex justify-between items-center px-4 py-2'>
        <h2 className='font-bold text-lg'>All Product</h2>
        <button className='border-2 py-1 px-3 rounded-full border-red-600 text-red-600 hover:bg-red-600 hover:text-white translate-all' onClick={() => setOpenUploadProduct(true)}>Upload Product</button>
      </div>


      {/* show upload products of admin */}
      <div className='flex gap-5 py-2   ml-2 items-center flex-wrap  h-[calc(100vh-190px)] overflow-y-scroll'>
        {
          allProduct.map((product, index)=>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchData={fetchAllProduct} />
              
            )
          })
        }

      </div>






      {
        openUploadProduct && (
          < UploadProduct onClose={() => setOpenUploadProduct(false)}  fetchData={fetchAllProduct}/>

        ) 
      }





    </div>
  )
}

export default AllProducts