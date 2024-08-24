import React from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../Api/api";
import Spiner from "../../Components/Spiner";
import useFetch from "../../Hooks/useFetch";
import image from "../../Assets/profile.png";

const CustomerProfile = () => {
    const { id } = useParams();
     
    const { data: user, error, loading } = useFetch(`${BASE_URL}/customers/${id}`);



    
  if (loading) return <div className="mt-4 text-center"><Spiner /></div>;

  if (error) return <div className="mt-2 h4 text-center">{error}</div>;

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
                  <h5 className="my-4 fw-bold">{user.username}</h5>
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

export default CustomerProfile;