import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage';
import SummeryApi from '../common';
import { toast } from 'react-toastify'

const AdminEditProduct = ({ onClose,productData ,fetchAllData}) => {



  const [data, setData] = useState({
    ...productData,
    productName: productData?.productName,
     brandName: productData?.brandName,
     category: productData?.category, 
     productImage: productData?.productImage || [], 
     description: productData?.description,
      price: productData?.price,
       sellingPrice: productData?.sellingPrice
  })


  console.log("edit data", data)

  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState('')




  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData((pre) => {
      return {
        ...pre,
        [name]: value
      }
    })
  }




  const handleUploadProduct = async (e) => {
    console.log("target", e)
    const file = e.target.files[0]
    const uploadCloudnary = await uploadImage(file)
    setData((pre) => {
      return {
        ...pre,
        productImage: [...pre.productImage, uploadCloudnary.url]

      }
    })
  }




  const handleDeleteProductImage = async (index) => {

    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    setData((pre) => {
      return {
        ...pre,
        productImage: [...newProductImage]
      }
    })

  }




  // Upload Product

  const handleSubmit = async (e) => {
    e.preventDefault()

    const response = await fetch(SummeryApi.updateProduct.url, {
      method: SummeryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify(data)

    })
    const json = await response.json()

    if (json.success) {
      toast.success(json?.message)
      onClose()
      fetchAllData()
    }

    if (json.error) {
      toast.error(json?.error)
    }

  }




  return (
    <div className='bg-slate-200 bg-opacity-35  fixed  w-full h-full top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
      <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[79%] overflow-hidden'>

        <div className='flex justify-between items-center pb-3'>
          <h2 className='font-bold text-lg'>Edit Product</h2>
          <div className=' w-fit ml-auto text-2xl  hover:text-red-600 cursor-pointer ' onClick={onClose}>
            <CgClose />
          </div>
        </div>


        <form className='grid p-4 gap-2 overflow-y-scroll h-full  pb-5 ' onSubmit={handleSubmit} >
          <label htmlFor="productName" className='mt-2'>Product Name :</label>
          <input
            type='text'
            id="productName"
            placeholder='Enter product name'
            name='productName'
            className=' border bg-slate-100 p-2 rounded'
            required
            value={data.productName}
            onChange={handleOnChange}
          />

          <label htmlFor="brandName" className='mt-3'>Brand Name :</label>
          <input
            type='text'
            id="brandName"
            placeholder='Enter brand name'
            name='brandName'
            value={data.brandName}
            className=' border bg-slate-100 p-2 rounded'
            required
            onChange={handleOnChange}
          />

          <label htmlFor="category" className='mt-3'>Category :</label>
          <select name="category" id="category" value={data.category} onChange={handleOnChange} required className='p-2  bg-slate-100 rounded border'>
            <option value={""}>Select Category</option>
            {productCategory.map((el, index) => {
              return (
                <option value={el.value} key={index}>{el.label}</option>
              )
            })}

          </select>


          <label htmlFor="productImage" className='mt-3'>Product Image :</label>
          <label htmlFor="uploadImageInput">
            <div className=' p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>

              <div className='flex justify-center items-center text-slate-500 flex-col gap-2'>
                <span className='text-4xl'> <FaCloudUploadAlt /></span>
                <p className='text-sm'>Upload Image</p>
                <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
              </div>

            </div>
          </label>


          <div>

            {
              data?.productImage[0] ? (

                <div className='flex items-center gap-2'>
                  {data.productImage.map((el, index) => {
                    return (
                      <div className='relative group'>
                        <img
                          key={index}
                          src={el}
                          alt={el}
                          width={80}
                          height={80}
                          className='bg-slate-100 cursor-pointer border'
                          onClick={() => {
                            setOpenFullScreenImage(true)
                            setFullScreenImage(el)
                          }}

                        />

                        <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                          <MdDelete />

                        </div>
                      </div>

                    )
                  })}
                </div>

              ) : (
                <p className='text-red-600 text-xs' >*Please Upload Product Image</p>
              )

            }
          </div>



          <label htmlFor="price" className='mt-3'> Price :</label>
          <input
            type="number"
            id='price'
            placeholder='Enter price'
            value={data.price}
            name='price'
            onChange={handleOnChange}
            className='bg-slate-100 p-2 rounded border'
            required

          />



          <label htmlFor="sellingPrice" className='mt-3'> Selling Price :</label>
          <input
            type="number"
            id='sellingPrice'
            placeholder='Enter selling price'
            value={data.sellingPrice}
            name='sellingPrice'
            onChange={handleOnChange}
            className='p-2 bg-slate-100 rounded border'
            required
          />


          <label htmlFor="description" className='mt-3'> description :</label>
          <textarea
            name="description"
            id="description"
            placeholder='Enter prodcut description'
            onChange={handleOnChange}
            value={data.description}
            rows={3}
            className='bg-slate-100 h-28 p-1 border resize-none'


          >

          </textarea>



          <button className='bg-red-600 px-3 py-2 text-white mb-10 hover:bg-red-700'>Update Product</button>
        </form>





      </div>




      {/* Display image full screen */}

      {
        openFullScreenImage && (
          <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />

        )
      }

    </div>
  )
}

export default AdminEditProduct