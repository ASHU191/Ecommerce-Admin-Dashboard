import React from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../Api/api";
import Spiner from "../../Components/Spiner";
import useFetch from "../../Hooks/useFetch";
import image from "../../Assets/profile.png";

const UserProfile = () => {
    const { id } = useParams();
     
    const { data: user, error, loading } = useFetch(`${BASE_URL}/users/${id}`);


  if (loading) <div className="mt-2 text-center"><Spiner /></div>;

  if (error) <div className="mt-2 h4 text-center">error</div>;

  return (
    <>
      {user && (
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
                      src={user.image ? user.image : image}
                      alt="avatar"
                      className="rounded-circle img-fluid mh-100 mw-100"
                    />
                  </div>
                  <h5 className="my-3">{user.username}</h5>
                  <div className="d-flex justify-content-center mb-2">
                    <Link
                     className="btn btn-sm me-1 btn-primary"
                     to={`/admin/users/${id}/edit`}
                     state={ user }
                     onClick={ (e)=> user.userType === "super admin" || user.userType === 'guest' ? e.preventDefault() : null}
                    >
                      edit user data
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
                      <p className="mb-0 fw-bold">Status :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{user.status}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">User Id :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{user.id}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Full Name :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{user.username}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Email :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{user.email}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Phone :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{user.phone}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Address :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">
                        {user.house}, {user.street}
                      </p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">State :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{user.state}</p>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-sm-3">
                      <p className="mb-0 fw-bold">Country :</p>
                    </div>
                    <div className="col-sm-9">
                      <p className=" mb-0">{user.country}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserProfile;
