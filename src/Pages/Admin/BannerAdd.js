import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addBanner } from "../../App/features/bannerSlice";

const BannerAdd = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [ bannerData, setBannerData ] = useState({ title:'', status: '', image: '' });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setBannerData(prev => ({...prev, [name]: value}))
    }

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("file", file)
        formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);

        toast.dismiss();
        toast.info('uploading image....')
    
        fetch( `https://api.cloudinary.com/v1_1/di2ow5e2d/upload`, {
          method: 'POST',
          body: formData,
      })
        .then(res => {
            if(!res.ok){
                throw new Error(res.statusText)
            } else {
                toast.dismiss()
                toast.success('Image Uploaded')
                return res.json()
            }
        })
        .then(data => {
          const image = data.url;
          setBannerData(prev => ({...prev, image: image}))
        })
        .catch(error => {
            toast.dismiss();
            toast.error('image not uploaded')
            console.log(error)
        })
      };


    const handleSubmit = (e) => {
        e.preventDefault();

        if (bannerData.image){
          dispatch(addBanner({bannerData}))
          .unwrap(unwrapResult)
          .then( res => {
            if(res.status){
              setBannerData({ title:'', status: '', image: '' });
              navigate(-1)
            }
          })
        } else {
          toast.dismiss()
          toast.error('no image found')
        }
        
    }


  return (
    <>
      <div className="container" style={{ maxWidth: "768px" }}>
        <form
          className="row g-3 my-5 shadow p-2 rounded"
          onSubmit={handleSubmit}
        >
          <div className="h4 text-center mb-3">Add Banner</div>
          <div className="col-12">
            <label htmlFor="title" className="form-label fw-bold">
                Title :
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={bannerData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-12">
                <label
                 className="form-label fw-bold" 
                 htmlFor="status"
                >
                    Status :
                </label>
                <select
                 className="form-select" 
                 id="status"
                 value={bannerData.status}
                 name="status"
                 onChange={handleChange}
                 required
                >
                    <option value="">-- Select Status --</option>
                    <option value="active">Active</option>
                    <option value="hidden">Hidden</option>
                </select>
            </div>
          <div className="col-md-12">
            <label htmlFor="image" className="form-label fw-bold">
              Image :
            </label>
            <input
              type="file"
              className="form-control"
              id="image"
              onChange={handleImageChange}
              required
            />
          </div>
          <div className="col-md-12" style={{ height: "100px", width: "300px" }}>
            <img
              className="mh-100 mw-100"
              src={bannerData.image}
              alt=""
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary mb-2 me-2">
              Add Banner
            </button>
            <button
              type="button"
              className="btn btn-danger mb-2 ms-2"
              onClick={() => navigate(-1)}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default BannerAdd