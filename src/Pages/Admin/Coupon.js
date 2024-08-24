import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoupon } from "../../App/features/couponSlice";
import AddCoupon from "../../Components/Admin/Coupon/AddCoupon";
import CouponTable from "../../Components/Admin/Coupon/CouponTable";
import EditCoupon from "../../Components/Admin/Coupon/EditCoupon";
import Search from "../../Components/Admin/Search";
import Pagination from "../../Components/Pagination";

const Coupon = () => {
  const dispatch = useDispatch();

  const { coupon, error } = useSelector((state) => state.coupon);

  useEffect(() => {
    const controler = new AbortController();
    const signal = controler.signal;

    dispatch(fetchCoupon({ signal }));

    return () => {
      controler.abort();
    };
  }, [dispatch]);

  const [cuponData, setCuponData] = useState([]);

  //  Pagination
  const [ page, setPage ] = useState(1)
  const dataLimit = 3;
  const lastIndex = page*dataLimit;
  const firstIndex = lastIndex - dataLimit;
  const totalData = cuponData.length;
  const currentCoupon = cuponData.slice(firstIndex, lastIndex)

  useEffect(() => {
    setCuponData(coupon);
    setPage(1)
  }, [coupon]);



  // search function
  const handleSearch = (e) => {
    const searchText = e.target.value;
    const filteredCoupon = coupon.filter(coupon => coupon.coupon.toLowerCase().includes(searchText.toLowerCase()) )
    setCuponData(filteredCoupon)
  }
  

  const [ isEdit, setIsEdit ] = useState(false)
  const [ editData, setEditData ] = useState({id:'', coupon:'', discount: '', status: ''})




  if (error) {
    return <div className="my-5 text-center h3">{error}</div>
  }

  return (
    <>
      { coupon && (
          <div className="container my-5 ">

            { !isEdit ? (
               <AddCoupon coupon={coupon} />
              ) : ( 
               <EditCoupon setIsEdit={setIsEdit} editData={editData} coupon={coupon} />
              ) 
            }

            <div className="card  bg-light">
              <div className="card-header py-2 d-flex flex-row align-items-center justify-content-between">
                
                <h5>Coupon</h5>

                <Search 
                  handleSearch={handleSearch}
                />

              </div>
              <div className="card-body p-1">
                {coupon.length ?(
                  <>
                    <CouponTable currentCoupon={currentCoupon} setEditData={setEditData} setIsEdit={setIsEdit} isEdit={isEdit} />
                    <Pagination page={page} setPage={setPage} total={totalData} limit={dataLimit} />
                  </>
                ) : null}
              </div>
            </div>
          </div>
        )
      }
    </>
  );
};

export default Coupon;
