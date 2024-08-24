import React from 'react'
import { Link } from "react-router-dom"
import { useDispatch } from 'react-redux';
import { deleteUser, updateUser } from '../../../App/features/usersSlice';
import dummyImage from '../../../Assets/profile.png'


const UsersTable = ({users}) => {

    const dispatch = useDispatch()

    const handleStatus = ({id, status}) => {
      if ( status === 'deactive' ){
        const updateData = {status: 'active'};
        dispatch(updateUser({id, updateData}))
      } else if ( status === 'active' ){
        const updateData = {status: 'deactive'};
        dispatch(updateUser({id, updateData}))
      }
    }

    const handleDelete = (id) => {
      dispatch(deleteUser(id))
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
          {users.map((user) => {
            const { id, username, image, email, phone, status,  userType } = user;

            return (
              <tr key={id}>
                <th>{id}</th>
                <th className='text-start'>
                    <Link
                     className='d-flex gap-2 ms-2 text-decoration-none text-dark'
                     to={`/admin/users/${id}`}
                    >
                        <span style={{heigth:'25px', width:'25px'}}><img className='h-100 w-100' src={image ? image : dummyImage}  alt=''/></span>
                        <span className=''>{username}</span>
                    </Link>
                </th>
                <td>{email}</td>
                <td>{phone}</td>
                <td className=" fw-bold">
                    <div className="ms-3 form-check form-switch d-flex justify-content-start align-items-center">
                      <input
                        className="form-check-input me-1"
                        type="checkbox"
                        role="switch"
                        id="flexSwitchCheckDefault"
                        defaultChecked={status === "active"}
                        onChange={() => handleStatus({id, status})}
                        disabled={userType === "super admin" || userType === 'guest'}
                      />
                      <label
                        className="form-check-label ms-1"
                        htmlFor="flexSwitchCheckDefault"
                      >
                        {status}
                      </label>
                    </div>
                </td>
                <td>
                    <div className='d-flex justify-content-start align-items-center'>
                        <Link
                            type="button"
                            className="btn btn-sm btn-primary me-1"
                            to={`/admin/users/${id}/edit`}
                            state={ user }
                            onClick={ (e)=> (userType === "super admin" || userType === 'guest') ? e.preventDefault() : null}
                        >
                            edit
                        </Link>
                        <button
                            type="button"
                            className={"btn btn-sm btn-danger ms-1"}
                            onClick={() => handleDelete(id)}
                            disabled={userType === "super admin" || userType === 'guest'}
                        >
                            delete
                        </button>
                    </div>
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

export default UsersTable