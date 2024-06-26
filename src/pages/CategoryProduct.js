import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import SummeryApi from '../common/index'
import SearchVerticalCart from '../components/SearchVerticalCart'

const CategoryProduct = () => {

  const param = useParams()
  const [data, setData] = useState([])
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const location = useLocation()
  const urlSearch = new URLSearchParams(location.search)
  const urlCategoryListinArray = urlSearch.getAll('category')

  const urlCategoryListObject = {}
  urlCategoryListinArray.forEach(el => {
    urlCategoryListObject[el] = true
  })


  const [selectCategory, setSelectCategory] = useState({})

  const [filterCategoryList, setFilterCategoryList] = useState([])

  const [sortBy, setSortBy]=useState("")



  const fetchData = async () => {
    const response = await fetch(SummeryApi.filterProduct.url, {
      method: SummeryApi.filterProduct.method,
      credentials: "include",
      headers: {
        'content-type': "application/json"
      },
      body: JSON.stringify({ category: filterCategoryList })

    })

    const json = await response.json()
    setData(json?.data || [])
    console.log("json-data", json)

  }


  const handleSelectCategory = (e) => {
    const { name, value, checked } = e.target
    setSelectCategory((prev) => {
      return {
        ...prev,
        [value]: checked

      }

    })
  }



  useEffect(() => {
    fetchData()

  }, [filterCategoryList])


  useEffect(() => {
    const arrayOfCategory = Object.keys(selectCategory).map((categoryKeyName) => {
      if (selectCategory[categoryKeyName]) {
        return categoryKeyName
      }
      return null
    }).filter((el) => el)

    setFilterCategoryList(arrayOfCategory)

    //format for url change when click on checkbox

    const urlFormat = arrayOfCategory.map((el, index) => {
      if ((arrayOfCategory.length - 1) === index) {
        return `category=${el}`
      }
      return `category=${el}&&`
    })

    navigate('/product-category?' + urlFormat.join(''))





  }, [selectCategory])





  //searching price high to  low and low to high
  const handleOnChangeSortBy=(e)=>{
    const {value} = e.target
    setSortBy(value)
     
    if(value=== "asc"){
      setData(prev=> prev.sort((a,b)=> a.sellingPrice -b.sellingPrice))
    }

    if(value=== "des"){
      setData(prev=> prev.sort((a,b)=> b.sellingPrice - a.sellingPrice))
    }

  }

  useEffect(()=>{

  }, [sortBy])


  return (
    <div className='container mx-auto p-4'>
      {/* desktop version */}

      <div className='hidden lg:grid grid-cols-[200px,1fr] '>

        {/* left side */}
        <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>


          {/* sortBy */}
          <div className='' >
            <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 '>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 my-2'>
              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy==='asc'} value={"asc"} onChange={handleOnChangeSortBy}/>
                <label>Price - Low to High</label>
              </div>

              <div className='flex items-center gap-3'>
                <input type='radio' name='sortBy' checked={(sortBy==="des")} value={"des"} onChange={handleOnChangeSortBy} />
                <label>Price - High to Low</label>
              </div>

            </form>

          </div>

          {/* filter by */}
          <div className='' >
            <h3 className='text-lg uppercase font-medium text-slate-500 border-b pb-1 border-slate-300 '>Sort by</h3>

            <form className='text-sm flex flex-col gap-2 my-2'>
              {
                productCategory.map((categoryName, index) => {
                  return (
                    <div className='flex items-center gap-3' key={"category" + index}>
                      <input type='checkbox' name={"category"} value={categoryName?.value} checked={selectCategory[categoryName?.value]} id={categoryName?.value} onChange={handleSelectCategory} />
                      <label htmlFor={categoryName?.value}>{categoryName.label}</label>
                    </div>
                  )
                })
              }


            </form>

          </div>

        </div>


        {/* right side (product) */}
        <div className='px-4'>
          <p className='font-medium text-slate-800 text-lg my-2'>Search Results : {data.length}</p>

          <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
            {
              data.length !== 0 && !loading && (
                <SearchVerticalCart data={data} loading={loading} />
              )
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default CategoryProduct