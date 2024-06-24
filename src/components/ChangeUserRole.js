import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoClose } from "react-icons/io5"
import SummeryApi from '../common'
import { toast } from 'react-toastify'

const ChangeUserRole = ({name, email, role, onClose, userId, calFun}) => {
     
    const [userRole, setUserRole]=useState(role)

    const handleOnChangeSelect=(e)=>{
        setUserRole(e.target.value)
    }

    
    const updateUserRole=async()=>{
        const response= await fetch(SummeryApi.updateUser.url,{
            method:SummeryApi.updateUser.method,
            credentials: "include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({role: userRole, userId:userId})
        })

        const json= await response.json()
        console.log("role update", json)
        if(json.success){
            toast.success(json.message)
            onClose()
            calFun()   
        }
        
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0  w-full h-full z-10  flex items-center justify-between bg-slate-200 bg-opacity-50'>
            <div className='mx-auto bg-white shadow-md p-4 w-full max-w-sm ' >

                <button className='block ml-auto text-lg' onClick={onClose}>
                 <IoClose />
                </button>

                <h1 className='pb-4 text-lg font-medium'>  Change User Role</h1>
                <p>Name : {name}</p>
                <p>Email : {email}</p>

               
                <div className='flex justify-between items-center my-4'>
                <p>Role : </p>
                    <select className='px-2 py-1 border' value={userRole} onChange={handleOnChangeSelect}>
                        
                        {
                            Object.values(ROLE).map(items => {
                                return (

                                    <option value={items} key={items}>{items}</option>
                                )
                            })

                        }

                    </select>

                </div>

          
                    <button className='w-fit mx-auto block item rounded-full px-3 py-1 bg-red-600 hover:bg-red-700 text-white' onClick={updateUserRole}>Change Role</button>
            
            </div>
        </div>
    )
}

export default ChangeUserRole