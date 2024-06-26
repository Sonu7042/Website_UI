import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import SummeryApi from '../common/index'
import SearchVerticalCart from '../components/SearchVerticalCart';



const SearchProduct = () => {
  const query = useLocation()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)


  const fetchProduct = async () => {
    setLoading(true)
    const respose = await fetch(SummeryApi.searchProduct.url + query.search)
    const json = await respose.json()
    setLoading(false)

    setData(json.data)

    



  }

  useEffect(() => {
    fetchProduct()

  }, [query])


  console.log("searchdata", data)

  return (
    <div className='container mx-auto p-4'>

      {
        loading && (
          <p className='text-lg text-center'>Loading....</p>
        )
      }

      <p className='text-lg my-3 font-semibold'>Search Result : {data.length}</p>

      {
        data.length === 0 && !loading && (
          <p className='bg-white text-lg text-center'>Not Data Found....</p>
        )
      }


      {
        data.length !== 0 && !loading && (
          <SearchVerticalCart data={data} loading={loading}/>
        )
      }

    </div>
  )
}

export default SearchProduct
