import React from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { updateCustomer } from '../../../App/features/customersSlice';
import dummyImage from '../../../Assets/profile.png'

const CustomersTable = ({customers}) => {

    const dispatch = useDispatch()

    const handleStatus = ({id, status}) => {
      if ( status === 'blocked' ){
        const updateData = {status: 'active'};
        dispatch(updateCustomer({id, updateData}))
      } else if ( status === 'active' ){
        const updateData = {status: 'blocked'};
        dispatch(updateCustomer({id, updateData}))
      }
    }




  return (
    <>
    <div className="table-responsive">
      <table className="table align-items-center text-center ">
        <thead className="thead-light ">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => {
            const { id, username, image, email, phone, status } = customer;

            return (
              <tr key={id}>
                <th>{id}</th>
                <th className='text-start'>
                    <Link
                     className='d-flex gap-2 ms-2 text-decoration-none text-dark'
                     to={`/admin/customers/${id}`}
                    >
                        <span style={{heigth:'25px', width:'25px'}}>
                            <img className='h-100 w-100' src={image ? image : dummyImage}  alt=''/>
                        </span>
                        <span className='fw-bold'>{username}</span>
                    </Link>
                </th>
                <td>{email}</td>
                <td>{phone}</td>
                <td className=" fw-bold">{status}</td>
                <td>
                    <button
                        type="button"
                        className={`btn btn-sm  ${status === "active"? "btn-danger" : "btn-success"}`}
                        onClick={() => handleStatus({id, status})}
                        disabled={id === 1}
                    >
                        { status === "active" ? "Block" : "Active" }
                    </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </>
  )
}

export default CustomersTable
