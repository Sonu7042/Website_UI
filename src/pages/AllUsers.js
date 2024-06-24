import React, { useEffect, useState } from 'react'
import SummeryApi from '../common'
import { toast } from 'react-toastify';
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';


const AllUsers = () => {

  const [allUser, setAllUser] = useState([])
  const [openUpdatRole, setOpenUpdateRole] = useState(false)

  const [updateUserDetails, setUpdateUserDetails] = useState({ name: "", email: "", role: "", _id:""})

  const fetchAllUsers = async () => {
    const response = await fetch(SummeryApi.allUser.url, {
      method: SummeryApi.allUser.method,
      credentials: 'include'

    })

    const json = await response.json()

    if (json.success) {
      setAllUser(json.data)
    }

    if (json.error) {
      toast.error(json.error)
    }


  }

  useEffect(() => {

    fetchAllUsers()

  }, [])



  return (
    <div className="bg-white pb-4">
      <table className='w-full userTable'>
        <thead>

          <tr>
            <th>Sr.</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Created Date</th>
            <th>Action</th>
          </tr>


        </thead>
        <tbody className='p-4'>

          {
            allUser.map((value, index) => {
              return (

                <tr >
                  <td >{index + 1}</td>
                  <td >{value?.name}</td>
                  <td >{value?.email}</td>
                  <td >{value?.role}</td>
                  <td >{moment(value?.createdAt).format('LLL')}</td>

                  <td>
                    <button className='bg-green-100 p-2 rounded-full cursor-pointer hover:bg-green-500 hover:text-white'
                      onClick={() => {
                        setUpdateUserDetails(value)
                        setOpenUpdateRole(true)
                          
                      }}>
                      {<MdEdit />}</button>
                  </td>




                </tr>

              )
            })

          }
        </tbody>

      </table>

      {
        openUpdatRole && (
          <ChangeUserRole
            onClose={() => setOpenUpdateRole(false)}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            calFun={fetchAllUsers}

          />

        )

      }


    </div>
  )
}

export default AllUsers 