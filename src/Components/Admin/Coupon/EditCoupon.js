import { unwrapResult } from '@reduxjs/toolkit';
import React from 'react'
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'
import { updateCoupon } from '../../../App/features/couponSlice';

const EditCoupon = ({setIsEdit, editData, coupon}) => {

    const dispatch = useDispatch()

    const [ couponData, setCoupon ] = useState({id:editData.id, coupon:editData.coupon, discount: editData.discount, status: editData.status})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setCoupon(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const alreadyExists = coupon.find(coup => coup.coupon === couponData.coupon && coup.id !== couponData.id)

        if (alreadyExists){
            toast.dismiss()
            toast.error('coupon already exists')
        }else if (couponData.discount < 1 || couponData.discount > 99) {
            toast.dismiss()
            toast.error('percent range should be 1 to 99')
        } else {
            const id = couponData.id;
            const updateData = {coupon:couponData.coupon, discount: Number(couponData.discount), status: couponData.status}
            
            dispatch(updateCoupon({id, updateData}))
             .unwrap(unwrapResult)
             .then(res => {
                if (res.status){
                    setIsEdit(false)
                }
             })
        }
    }

  return (
    <>
        <div className="card  my-5 mx-auto" >
          <div className="card-header py-1 ">
            <h5 className="fw-bold">Edit Coupon</h5>
          </div>
          <div className="card-body">
          <form onSubmit={handleSubmit} className={'row row-cols-lg-auto g-3 align-items-end justify-content-center'}>
            <div className="col-12">
                <label
                 htmlFor="coupon" 
                 className="form-label fw-bold"
                >
                    Coupon :
                </label>
                <input
                 type="text" 
                 id="coupon" 
                 className="form-control" 
                 placeholder="enter coupon name" 
                 name="coupon" 
                 value={couponData.coupon}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className="col-12">
                <label
                 htmlFor="coupon" 
                 className="form-label fw-bold"
                >
                    Discount :
                </label>
                <input
                 type="number" 
                 id="coupon" 
                 className="form-control" 
                 placeholder="enter discount percent" 
                 name="discount" 
                 value={couponData.discount}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className="col-12">
                <label
                 className="form-label fw-bold" 
                 htmlFor="status"
                >
                    Status :
                </label>
                <select
                 className="form-select" 
                 id="status"
                 value={couponData.status}
                 name="status"
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
                 className="btn btn-sm btn-primary me-1"
                >
                    Update
                </button>
                <button
                 type="button" 
                 className="btn btn-sm btn-danger ms-1"
                 onClick={() => setIsEdit(false)}
                >
                    Cancel
                </button>
            </div>
            </form>
          </div>
        </div>
    </>
  )
}

export default EditCoupon