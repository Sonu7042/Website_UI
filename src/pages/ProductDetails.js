import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummeryApi from '../common/index'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurency from '../helpers/displayCurrency';
import VerticalCardProduct from '../components/VerticalCardProduct';


const ProductDetails = () => {

  const [data, setData] = useState({
    productName: "",
    brandName: "",
    category: "",
    productImage: [],
    description: "",
    price: "",
    sellingPrice: ""
  })



  const param = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState('')

  const [zoomImageCoordinate, setZoomImageCoordinate] = useState({ x: 0, y: 0 })

  const [zoomImage, setZoomImage] = useState(false)



  const fetchProductDetails = async () => {
    const response = await fetch(SummeryApi.productDetails.url, {
      method: SummeryApi.productDetails.method,
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ productId: param?.id })
    })
    setLoading(false)
    const json = await response.json()
    setData(json.data)
    setActiveImage(json?.data?.productImage[0])
  }


  // console.log("data", data)



  useEffect(() => {
    fetchProductDetails()

  }, [])


  const handleMouseEnterProduct = (image) => {
    setActiveImage(image)
  }


  const handleLeaveImageZoom=()=>{
    setZoomImage(false)
  }




  const handleZoomImage = useCallback((e) => {
    setZoomImage(true)

    const { left, top, width, height } = e.target.getBoundingClientRect()

    console.log("cordinate", "left", left, "top", top, "width", width, "height", height)

    console.log("clientX", e.clientX)
    console.log("clientY", e.clientY)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
  }, [])

  console.log("zoomImageCoordinate", zoomImageCoordinate)









  return (
    <div className=' container mx-auto p-6'>
      <div className='min-h-[200px] flex  flex-col lg:flex-row  gap-4'>

        {/* Product image */}
        <div className='h-96 flex flex-col lg:flex-row-reverse gap-2 '>

          <div className='w-[370px] h-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
            <img src={activeImage} className='w-full h-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage}  onMouseLeave={handleLeaveImageZoom}/>

            {/* product zoom */}
            {
              zoomImage && (

                <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-slate-200  -right-[510px] p-1 top-0' >
                  <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply scale-150'
                    style={{
                      backgroundImage: `url(${activeImage})`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}%`
                     

                    }}
                  >
                  </div>

                </div>

              )
            }


          </div>





          <div className='h-full ' >
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading?.map((el, index) => {
                      return (
                        <div className='bg-slate-200 w-20 h-20 rounded animate-pulse' key={"loadingImage" + index}>

                        </div>

                      )
                    })
                  }
                </div>

              ) : (

                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    data?.productImage?.map((imageUrl, index) => {
                      return (
                        <div className='bg-slate-200 w-20 h-20 rounded' key={imageUrl}>
                          <img src={imageUrl} className='w-full h-full mix-blend-multiply object-scale-down cursor-pointer' onMouseEnter={() => handleMouseEnterProduct(imageUrl)} onClick={() => handleMouseEnterProduct(imageUrl)} />
                        </div>

                      )
                    })
                  }
                </div>
              )

            }


          </div>
        </div>



        {/*Product Details*/}

        {
          loading ? (
            <div className='grid gap-1 w-full'>
              <p className='bg-slate-200  h-6 lg:h-8 w-full animate-pulse rounded-full inline-block '></p>
              <h2 className='text-2xl lg:text-4xl lg:h-8 font-medium h-6 animate-pulse bg-slate-200 '></h2>
              <p className='capitalize bg-slate-200  lg:h-8 h-6 min-w-[100px] animate-pulse'></p>

              <div className='flex text-red-600 lg:h-8  h-6 bg-slate-200 animate-pulse items-center gap-1 my-1'>

              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl my-1 h-6 animate-pulse '>
                <p className='text-red-600 bg-slate-200 h-full w-full p-2 lg:h-8'></p>
                <p className='text-slate-400 line-through h-full lg:h-8 bg-slate-200 p-2 w-full'></p>
              </div>

              <div className='flex gap-3 items-center my-2 lg:h-8' >
                <button className="bg-slate-200 h-6 rounded animate-pulse p-2 w-full"></button>
                <button className="bg-slate-200 h-6 rounded animate-pulse p-2 w-full"></button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1 h-6 bg-slate-200 lg:h-8'> </p>
                <p className='bg-slate-200 h-8 lg:h-8 '></p>
              </div>

            </div>
          ) : (
            <div className='flex flex-col gap-1'>
              <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
              <h2 className='text-2xl lg:text-4xl font-medium'>{data?.productName}</h2>
              <p className='capitalize text-slate-400'>{data?.category}</p>

              <div className='flex text-red-600  items-center gap-1 my-1'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='flex items-center gap-2 text-2xl lg:text-3xl my-1'>
                <p className='text-red-600'>{displayINRCurency(data?.sellingPrice)}</p>
                <p className='text-slate-400 line-through'>{displayINRCurency(data?.price)}</p>
              </div>

              <div className='flex gap-3 items-center my-2' >
                <button className='border-2 border-red-600 px-3 py-1 rounded min-w-[120px] text-red-600 text-medium hover:bg-red-600 hover:text-white'>Buy</button>
                <button className='border-2 border-red-600 px-3 py-1 rounded min-w-[120px] text-white bg-red-600 text-medium hover:bg-white hover:text-red-600'>Add To Cart</button>
              </div>

              <div>
                <p className='text-slate-600 font-medium my-1'>Description : </p>
                <p>{data?.description}</p>
              </div>

            </div>
          )

        }



      </div>

      {
        data.category && (
          <VerticalCardProduct   category={data.category} heading={"Recommand Products"}/>
        )

      }

    </div>
  )
}

export default ProductDetails