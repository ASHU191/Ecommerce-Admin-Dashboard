import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBanner, fetchBanner, updateBanner } from "../../App/features/bannerSlice";
import AddLinkButton from "../../Components/Admin/AddLinkButton";

const Banners = () => {
  const dispatch = useDispatch();

  const {adminData} = useSelector((state) => state.adminAuth);

  const { banner, error } = useSelector(state => state.banner)

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;

    dispatch(fetchBanner({ signal }));

    return () => {
      controler.abort();
    };
  }, [dispatch]);


  const handleStatus = ({ id, status }) => {
    if (status === "hidden") {
      const updateData = { status: "active" };
      dispatch(updateBanner({ id, updateData }));
    } else if (status === "active") {
      const updateData = { status: "hidden" };
      dispatch(updateBanner({ id, updateData }));
    }
  };

  const handleDelete = (id) => {
    dispatch(deleteBanner({id}))
  }



  if (error) {
    return <div className="my-5 text-center h3">{error}</div>
  }

  return (
    <>
      { banner && (
            <div className="card  bg-light my-5">
              <div className="card-header">
                
                <AddLinkButton
                  btntext={"Add Banner"}
                  link={"/admin/banner/add"}
                />

              </div>
              <div className="card-body row  ">
                {banner && banner.map(ban => {
                  const { id, title, status, image } = ban;
                  return (
                    <div key={id} className=" col-12 col-md-6 mb-3">
                      <div className="card" >
                        <img className="img-fluid p-2"  src={image} alt='' />
                        <div className="card-body d-flex justify-content-between">
                          <div>
                            <h5 className="card-title">{title}</h5>
                            <h6 className="card-title">Status : {status}</h6>
                          </div>
                          <div>
                            <button
                             className={`btn btn-sm mx-1 ${status === 'active'? 'btn-danger':'btn-success'}`}
                             onClick={()=> handleStatus({id, status})}
                             disabled={ (adminData.userType !== 'super admin' && id <= 2 )}
                            >
                              { status === 'active'? 'hide' : 'show'}
                            </button>
                            { adminData.userType === 'super admin' && (
                              <button
                              className="btn btn-sm btn-danger mx-1"
                              onDoubleClick={()=> handleDelete(id)}
                              >
                                delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
        )
      }
    </>
  );
};



export default Banners