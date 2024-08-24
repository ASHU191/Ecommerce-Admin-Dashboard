import React from 'react'
import { toast } from 'react-toastify'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCoupon } from '../../../App/features/couponSlice';

const AddCoupon = ({coupon}) => {

    const dispatch = useDispatch()

    const [ couponData, setCouponData ] = useState({coupon:'', discount: '', status: ''})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setCouponData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const alreadyExists = coupon.find(coup => coup.coupon === couponData.coupon)

        if (alreadyExists){
            toast.dismiss()
            toast.error('coupon already exists')
        }else if (couponData.discount < 1 || couponData.discount > 99) {
            toast.dismiss()
            toast.error('percent range should be 1 to 99')
        } else {
            const postData = {coupon:couponData.coupon, discount: Number(couponData.discount), status: couponData.status}
            dispatch(addCoupon({postData}))
            setCouponData({coupon:'', discount: '', status: ''})
        }
    }

  return (
    <>
        <div className="card  my-5 mx-auto" >
          <div className="card-header py-1 ">
            <h4 className="fw-bold">Add Coupon</h4>
          </div>
          <div className="card-body">
          <form onSubmit={handleSubmit} className={'row row-cols-lg-auto g-3 align-items-center justify-content-start'}>
            <div className="col-12">
                <input
                 type="text" 
                 className="form-control" 
                 placeholder="enter coupon name" 
                 name="coupon" 
                 value={couponData.coupon}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className="col-12">
                <input
                 type="number" 
                 className="form-control" 
                 placeholder="enter discount percent" 
                 name="discount" 
                 value={couponData.discount}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className="col-12">
                <select
                 className="form-select" 
                 name="status"
                 value={couponData.status}
                 onChange={handleChange}
                 required
                >
                    <option value="">-- Select Status --</option>
                    <option value="active">Active</option>
                    <option value="deactive">Deactive</option>
                </select>
            </div>
            <div className='col-12'>
                <button
                type="submit" 
                className="btn btn-success"
                >
                    Add Coupon
                </button>
            </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default AddCoupon