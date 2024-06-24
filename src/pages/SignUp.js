import React, { useState } from 'react'
import loginIcon from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom'
import imageTobase64 from '../helpers/imageTobase64'
import SummeryApi from '../common';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


const SignUp = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [data, setData] = useState({ name: "", email: "", password: "", confirmPassword: "", profilePic: "" })

  const navigate=useNavigate()

  const onchange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })

  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password === data.confirmPassword) {

      const response = await fetch(SummeryApi.signup.url, {
        method: SummeryApi.signup.method,
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      })

      const json = await response.json()
      if(json.success){
        toast.success(json.message)
        navigate('/login')
      }

      if(json.error){
        toast.error(json.message)
      }
     
     
    }
    else{
      toast.error("Please check password and confirmPassword")
    }


  }

  const handlePicUpload = async (e) => {
    const file = e.target.files[0]
    const imagePic = await imageTobase64(file)
    setData((preve) => {
      return {
        ...preve,
        profilePic: imagePic
      }
    })
  }




  return (
    <section id='signup'>
      <div className='mx-auto container p-4'>

        <div className='bg-white  w-full p-4 max-w-sm mx-auto'>

          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || loginIcon} alt="login icon" />
            </div>
            <form >
              <label >
                <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 text-center absolute bottom-0 w-full'>
                  Upload Photo
                </div>
                <input className='hidden' type="file" onChange={handlePicUpload} />

              </label>
            </form>

          </div>

          <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>

            <div>
              <label >Name:</label>
              <div className='bg-slate-100 p-1'>
                <input type="text"
                  name='name'
                  placeholder='enter name'
                  onChange={onchange}
                  required
                  value={data.name}
                  className='w-full h-full outline-none bg-transparent' />
              </div>
            </div>

            <div>
              <label >Email:</label>
              <div className='bg-slate-100 p-1'>
                <input type="email"
                  name='email'
                  placeholder='enter email'
                  onChange={onchange}
                  required
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
                  required
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

            </div>

            <div>
              <label >Confirm Password:</label>
              <div className='bg-slate-100 flex  p-1'>
                <input type={showConfirmPassword ? "text" : "password"}
                  placeholder='enter confirm password'
                  onChange={onchange}
                  required
                  name="confirmPassword"
                  value={data.confirmPassword}
                  className='w-full h-full  bg-transparent' />

                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword((pre) => !pre)}>
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

            </div>

            <button className='bg-red-600 hover:bg-red-700 text-white px-6 py-2 max-w-[150px] w-full rounded-full hover:scale-110 translation-all mx-auto block mt-4'>Sign Up</button>



          </form>

          <p className='py-5'>Already have account ? <Link to={'/login'} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>

        </div>


      </div>
    </section >
  )
}

export default SignUp