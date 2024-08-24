import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import image from '../../Assets/profile.png'

const Profile = () => {
  const  { customerData } = useSelector(state => state.customerAuth)
  

  return (
    <>
      {customerData && (
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-4">
              <div className="card mb-4">
                <div className="card-body text-center">
                  <div
                    className="mx-auto"
                    style={{ height: "150px", width: "150px" }}
                  >
                    <img
                      src={customerData.image ? customerData.image : image}
                      alt=""
                      className="rounded-circle img-fluid mh-100 mw-100"
                    />
                  </div>
                  <h5 className="my-3">{customerData.username}</h5>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                     className="btn btn-sm me-1 btn-primary"
                     to={`/profile/edit`}
                    >
                      Edit Profile
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <div className="card mb-4">
                <div className="card-body">
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">User Id :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{customerData.id}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Full Name :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{customerData.username}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Email :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{customerData.email}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Phone :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{customerData.phone}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Address :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">
                        {customerData.house}, {customerData.street}
                      </p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">State :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{customerData.state}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Country :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{customerData.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Profile