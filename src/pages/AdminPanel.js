import React, { useEffect } from 'react'
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from 'react-redux';
import {Link, Outlet, useNavigate} from 'react-router-dom'
import ROLE from '../common/role';



const AdminPanel = () => {

  const navigate=useNavigate()

  const user = useSelector(state => state?.user?.user)

  useEffect(()=>{
    if(user?.role !==ROLE.ADMIN){
      navigate('/')


    }

  }, [user])

  return (
    <>
      <div className='min-h-[calc(100vh-120px)] md:flex hidden '>

        <aside className='bg-white min-h-full w-full max-w-60   ' style={{ boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
          <div className=' h-32 flex justify-center items-center flex-col'>
            

            <div className='text-5xl cursor-pointer justify-center relative flex '  >

              {
                user?.profilePic ? (
                  <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                ) : (
                  <FaUserCircle />
                )
              }

            </div>
            <p className='text-lg font-semibold capitalize'>
              {user?.name}
            </p>
            <p className='text-sm'>
              {user?.role}
            </p>
          </div>

          {/* navigation */}
          <div>
            <nav className='grid p-4'>
              <Link to={'all-users'}  className='px-2 py-1 hover:bg-slate-100'>All Users</Link>
              <Link to={'all-products'} className='px-2 py-1 hover:bg-slate-100'>product</Link>

            </nav>
          </div>



        </aside>

        <main className='p-2  h-full w-full'>
        <Outlet />
        </main>
      </div>
    </>
  )
}

export default AdminPanel