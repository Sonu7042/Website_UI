import React, { useContext, useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom'
import SummeryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {

  const [showPassword, setShowPassword] = useState(false)

  const [data, setData] = useState({ email: "", password: "" })

  const {fetchUserDetails, fetchUserAddToCart}=useContext(Context)

  
  const navigate=useNavigate()

  

  const onchange=(e)=>{
    setData({...data, [e.target.name]:e.target.value})

  }

  const handleSubmit= async(e)=>{
    e.preventDefault()

    const response= await fetch(`${SummeryApi.signin.url}`,{
      method:SummeryApi.signin.method,
      credentials:"include",
      headers:{
        'content-type':"application/json"
      },
      body:JSON.stringify(data)
      
      
    })
    const json= await response.json()

    if(json.success){
      toast.success(json.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }

     
    if(json.error){
      toast.error(json.message)
    }


  }

  return (
    <section id='login'>
      <div className='mx-auto container p-4'>

        <div className='bg-white  w-full p-4 max-w-sm mx-auto'>

          <div className='w-20 h-20 mx-auto'>
            <img src={loginIcon} alt="login icon" />
          </div>

          <form className='pt-6 flex flex-col gap-2'  onSubmit={handleSubmit}>

            <div>
              <label >Email:</label>
              <div className='bg-slate-100 p-1'>
                <input type="email"
                   name='email'
                  placeholder='enter email'
                  onChange={onchange}
                  value={data.email}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div>
              <label >Password:</label>
              <div className='bg-slate-100 flex  p-1'>
                <input type={showPassword ? "text" : "password"}
                  placeholder='enter password'
                  onChange={onchange}
                  name="password"
                  value={data.password}
                  className='w-full h-full  bg-transparent' />

                <div className='cursor-pointer text-xl' onClick={() => setShowPassword((pre) => !pre)}>
                  <span>
                    {
                      showPassword ? (
                        <FaEyeSlash />

                      ) :
                        (
                          <FaEye />

                        )

                    }
                  </span>
                </div>
              </div>
              <Link to={"/forget_password"} className='block w-fit ml-auto hover:underline hover:text-red-600'>
                forget password ?
              </Link>
            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 max-w-[150px] w-full rounded-full hover:scale-110 translation-all mx-auto block mt-4'>Login</button>



          </form>

          <p className='py-5'>Don't have account ? <Link to={'/sign-up'} className='text-red-600 hover:text-red-700 hover:underline'>Sign up</Link></p>

        </div>


      </div>
    </section>
  )
}

export default Login