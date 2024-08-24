import React  from "react";
import { useDispatch } from "react-redux";
import { updateCouponStatus } from "../../../App/features/couponSlice";

const CouponTable = ({ currentCoupon, setEditData, setIsEdit, isEdit }) => {

  const dispatch = useDispatch()

  const handleStatus = ({id, status}) => {
    if ( status === 'deactive' ){
      const updateData = {status: 'active'};
      dispatch(updateCouponStatus({id, updateData}))
    } else if ( status === 'active' ){
      const updateData = {status: 'deactive'};
      dispatch(updateCouponStatus({id, updateData}))
    }
  }

  const handleEdit = (coup) => {
    setEditData(prev => ({...prev, ...coup}));
    setIsEdit(true);
  }

  return (
    <>
      <div className="table-responsive">
        <table className="table align-items-center text-center ">
          <thead className="thead-light ">
            <tr>
              <th>Id</th>
              <th>Coupon</th>
              <th>Discount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCoupon.map((coup) => {
              const { id, coupon, discount, status } = coup;

              return (
                <tr key={id}>
                  <th>{id}</th>
                  <td>{coupon}</td>
                  <td>{discount}%</td>
                  <td className="fw-bold">{status}</td>
                  <td>
                    <div className="d-flex justify-content-center">
                      <button
                        type="button"
                        className="btn btn-sm btn-primary me-1"
                        onClick={()=> handleEdit(coup)}
                        disabled={isEdit}
                      >
                        edit
                      </button>
                      <button
                        type="button"
                        className={status === 'active' ?  `btn btn-sm btn-danger ms-1`: `btn btn-sm btn-success ms-1`}
                        onClick={() => handleStatus({id,status})}
                        disabled={isEdit}
                      >
                        {status === 'active' ? 'deactive' : 'active'}
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
  );
};

export default CouponTable;
