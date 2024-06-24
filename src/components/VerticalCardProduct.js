import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurency from '../helpers/displayCurrency'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";
import addToCard from '../helpers/addToCard';
import { Link } from 'react-router-dom';
import Context from '../context';

const VerticalCardProduct = ({ category, heading }) => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)


    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)


    const handleAddToCart = async (e, id) => {
        await addToCard(e, id)
        fetchUserAddToCart()


    }

    const [scroll, setScroll] = useState(0)

    const scrollElement = useRef()

    const scrollRight = () => {
        scrollElement.current.scrollLeft += 300
    }

    const scrollLeft = () => {
        scrollElement.current.scrollLeft -= 300
    }


    const fetchData = async () => {
        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)
        setLoading(false)
        setData(categoryProduct.data)
    }


    useEffect(() => {
        fetchData()
    }, [])




    return (
        <div className='container mx-auto px-4  py-6 relative' >
            <h2 className='text-2xl font-semibold py-4' >{heading}</h2>

            <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

                <button className='bg-white p-1  text-2xl rounded-full shadow-md absolute left-0 hidden md:block' onClick={scrollLeft}> <FaAngleLeft /> </button>
                <button className='bg-white p-1  text-2xl rounded-full shadow-md absolute right-0 hidden md:block' onClick={scrollRight}> <FaAngleRight /> </button>

                {


                    loading ? (

                        loadingList.map((product, index) => {
                            return (
                                <div className='bg-white  w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]' key={index}>

                                    <div className='flex justify-center items-center  h-48 w-full bg-slate-200 min-w-[180px] md:min-w-[145px] p-2 animate-pulse'>

                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h1 className='font-medium text-black text-base md:text-lg text-ellipsis line-clamp-1 p-1 animate-pulse bg-slate-200 rounded-full py-2'></h1>
                                        <p className='capitalize text-slate-500 p-1 animate-pulse bg-slate-200 rounded-full py-2'></p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium p-1 animate-pulse bg-slate-200 rounded-full w-full py-2'></p>
                                            <p className='text-slate-500 line-through p-1 animate-pulse bg-slate-200 rounded-full w-full py-2'></p>
                                        </div>
                                        <button className=' mt-1 text-white px-3  text-sm rounded-full bg-slate-200 py-2 animate-pulse'></button>
                                    </div>

                                </div>
                            )
                        })

                    ) : (
                        data.map((product, index) => {
                            return (
                                <Link to={'product/' + product._id} className='bg-white  w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]' key={index}>

                                    <div className='flex justify-center items-center  h-48 w-full bg-slate-200 min-w-[180px] md:min-w-[145px] p-2'>
                                        <img src={product?.productImage[0]} alt="" className='object-scale-down h-full hover:scale-110 translate-all mix-blend-multiply' />
                                    </div>
                                    <div className='p-4 grid gap-3'>
                                        <h1 className='font-medium text-black text-base md:text-lg text-ellipsis line-clamp-1'>{product?.productName}</h1>
                                        <p className='capitalize text-slate-500'>{product?.category}</p>
                                        <div className='flex gap-3'>
                                            <p className='text-red-600 font-medium'>{displayINRCurency(product?.sellingPrice)}</p>
                                            <p className='text-slate-500 line-through'>{displayINRCurency(product?.price)}</p>
                                        </div>
                                        <button className='bg-red-600 hover:bg-red-700 mt-1 text-white px-3 py-0.5 text-sm rounded-full' onClick={(e) => handleAddToCart(e, product?._id)}>Add to Cart</button>
                                    </div>

                                </Link>
                            )
                        })

                    )


                }



            </div>


        </div>
    )
}

export default VerticalCardProduct