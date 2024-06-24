import React, { useEffect, useState } from 'react'
import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";



import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'



import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'


const deskstopImages = [image1, image2, image3, image4, image5]

const mobileImages = [image1Mobile, image2Mobile, image3Mobile, image4Mobile, image5Mobile]



const BannerProduct = () => {

  const [currentImage, setCurrentImage] = useState(0)


  const nextImage=()=>{
    if(deskstopImages.length-1> currentImage)
    setCurrentImage((pre)=>pre+1)
  }

  const previouseImage=()=>{
    if(currentImage !==0)
    setCurrentImage((pre)=>pre-1)
  }



  useEffect(()=>{
    const interval=setInterval(()=>{
      if(deskstopImages.length-1>currentImage){
        nextImage()
      }
      else{
        setCurrentImage(0)

      }

    },5000)

    return ()=>clearInterval(interval)

  },[currentImage])








  return (
    <div className='container mx-auto px-4 rounded '>

      <div className='bg-slate-200 md:h-72 w-full h-60 relative'>

        <div className='absolute z-10 md:flex items-center w-full h-full hidden'>

          <div className='flex justify-between w-full' >
            <button className='bg-white p-1  text-2xl rounded-full shadow-md' onClick={previouseImage}> <FaAngleLeft /> </button>
            <button className='bg-white p-1  text-2xl rounded-full shadow-md' onClick={nextImage}> <FaAngleRight /> </button>
          </div>

        </div>


         {/* desktop version images */}
        <div className='flex w-full h-full overflow-hidden hidden md:flex'>
          {
            deskstopImages.map((imageUrl, index) => {
              return (
                <div className='w-full h-full min-h-full min-w-full translate-all' key={imageUrl + index} style={{ transform: `translate(-${currentImage * 100}%)` }}>
                  <img src={imageUrl} className='h-full w-full' />
                </div>

              )
            })
          }
        </div>


        {/* mobile version images */}

        <div className='flex w-full h-full overflow-hidden md:hidden'>
          {
            mobileImages.map((imageUrl, index) => {
              return (
                <div className='w-full h-full min-h-full min-w-full translate-all' key={imageUrl + index} style={{ transform: `translate(-${currentImage * 100}%)` }}>
                  <img src={imageUrl} className='h-full w-full' />
                </div>

              )
            })
          }
        </div>


      
      </div>
    </div>
  )
}

export default BannerProduct