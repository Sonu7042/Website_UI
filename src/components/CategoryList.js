import React, { useEffect, useState } from 'react'
import SummeryApi from '../common/index'
import { Link } from 'react-router-dom'


const CategoryList = () => {

  const [categoryProduct, setCategoryProduct] = useState([])
  const [loading, setloading] = useState(false)


  const categoryLoading= new Array(13).fill(null)


  const fetchCategoryProduct = async () => {
    setloading(true)
    const response = await fetch(SummeryApi.categoryProduct.url)
    const json = await response.json()
    setloading(false)
    setCategoryProduct(json.data)
  }


  useEffect(() => {

    fetchCategoryProduct()

  }, [])



  return (
    <div className='container mx-auto p-4'>
      <div className='flex items-center justify-between gap-4 overflow-scroll scrollbar-none '>

        {
          loading ? (
           
              categoryLoading.map((el, index)=>{
                return(
                  <div className='h-16 w-16  md:h-20 md:w-20 rounded-full overflow-hidden bg-slate-200 animate-pulse' key={"categoryLoading"+index}>

                  </div>

                )
              })
           
           
          ) : (
            categoryProduct.map((product, index) => {
              return (
                <Link to={"product-category/" + product?.category} className='cursor-pointer' key={product?.category+index}>
                  <div className=' h-16 w-16 md:w-20 md:h-20 rounded-full overflow-hidden bg-slate-200 p-4 flex justify-center items-center '>
                    <img src={product?.productImage[0]} alt={product?.category} className='h-full object-scale-down mix-blend-multiply hover:scale-125 translate-all ' />
                  </div>
                  <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                </Link>
              )
            })

          )
        }



      </div>
    </div>
  )
}

export default CategoryList