import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { IoSearch } from "react-icons/io5";
import { FaUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux'
import SummeryApi from '../common/index'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux';
import { setUserDetails } from '../store/userSlice';
import role from '../common/role'
import Context from '../context';
import amazon from '../assest/png-transparent-amazon-com-amazon-alexa-retail-amazon-prime-order-fulfillment-amazon-miscellaneous-company-text.png'


const Header = () => {

  const dispatch = useDispatch()

  const context = useContext(Context)


  const [menuDisplay, setMenuDisplay] = useState(false)

  const user = useSelector(state => state?.user?.user)
  // console.log("user header", user)


  const handleLogout = async () => {
    const response = await fetch(SummeryApi.user_logout.url, {
      method: SummeryApi.user_logout.method,
      credentials: "include"
    })

    const json = await response.json()

    if (json.success) {
      toast.success(json.message)
      dispatch(setUserDetails(null))

    }

    if (json.error) {
      toast.error(json.message)
    }

  }


  // console.log("context", context)


  return (
    <header className='h-16 shadow-md bg-white fixed w-full z-40'>
      <div className=' h-full flex items-center container mx-auto px-4 justify-between'>
        <div className='flex items-center '>
          <Link to='/'>
            {/* <Logo h={50} width={90} /> */}
            <img src={amazon} alt="" className='mix-blend-multiply' width={100} />
          </Link>
        </div>

        <div className=' hidden lg:flex  items-center mx-w-sm border justify-center rounded-full focus-within:shadow-md pl-2'>
          <input type="text" placeholder='Search Product here..' className=' outline-none ' />
          <div className='flex items-center text-lg min-w-[50px] h-8 bg-red-500 justify-center rounded-r-full text-white'>
            <IoSearch />
          </div>
        </div>

        <div className='flex items-center gap-7' >

          <div className='relative  flex justify-center '>

            {
              user?._id && (
                <div className='text-2xl cursor-pointer' onClick={() => setMenuDisplay(prev => !prev)}>
                  {
                    user?.profilePic ? (
                      <img src={user?.profilePic} className='w-9 h-9 rounded-full' alt={user?.name} />
                    ) : (
                      <FaUserCircle />
                    )
                  }

                </div>

              )
            }




            {menuDisplay && (

              <div className='absolute bg-white bottom-0 top-11 h-fit shadow-lg p-2 rounded '>
                <nav>
                  {user?.role === role.ADMIN && (
                    <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(prev => !prev)}> Admin Panel</Link>

                  )}

                </nav>
              </div>
            )
            }
          </div>


          {
            user?._id && (
              <Link to={"/cart"} className='relative'>
                <span> <FaShoppingCart className='text-2xl' /></span>

                <div className='bg-red-500 text-white p-2 w-5  h-5 rounded-full flex items-center justify-center absolute -top-2 -right-3'>
                  <p className='text-sm'>{context?.cartProductCount}</p>
                </div>

              </Link>

            )
          }


          <div className='h-full'>
            {
              user?._id ? (
                <button onClick={handleLogout} className='bg-red-600 text-white px-3 py-1 rounded-full items-center hover:bg-red-700 justify-center '>Logout</button>
              ) : (
                <Link to={'/login'} className='bg-red-600 h-full text-white px-3 py-1 rounded-full items-center hover:bg-red-700 justify-center '>Login</Link>

              )
            }

          </div>


        </div>




      </div>
    </header>
  )
}

export default Header