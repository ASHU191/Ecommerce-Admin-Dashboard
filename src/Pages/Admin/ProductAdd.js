import { unwrapResult } from "@reduxjs/toolkit";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL } from "../../Api/api";
import { addProduct } from "../../App/features/productsSlice";
import useFetch from "../../Hooks/useFetch";

const ProductAdd = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { data: category } = useFetch(`${BASE_URL}/category`)

    const initialState = { title:'', description:'', brand:'', status :'', category : '' }

    const [ productData, setProductData ] = useState(initialState);
    const [ price, setPrice ] = useState('')
    const [ image, setImage ] = useState('')

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setProductData(prev => ({...prev, [name]: value}))
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value)
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
            setImage(data.secure_url)
        })
        .catch(error => {
            toast.dismiss();
            toast.error('image not uploaded')
            console.log(error)
        })
      };

    const handleSubmit = (e) => {
        e.preventDefault();

        const productDetails = { ...productData, price: Number(price), image};

        if (image){
          dispatch(addProduct({productDetails}))
          .unwrap(unwrapResult)
          .then( res => {
            if(res.status){
              setProductData(initialState);
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
          <div className="h4 text-center mb-3">Add Product</div>
          <div className="col-12">
            <label htmlFor="title" className="form-label fw-bold">
                Title :
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={productData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-12">
            <label htmlFor="description" className="form-label fw-bold">
                Description :
            </label>
            <textarea
              type="text"
              className="form-control"
              id="description"
              name="description"
              value={productData.description}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="brand" className="form-label fw-bold">
                Brand :
            </label>
            <input
              type="text"
              className="form-control"
              id="brand"
              name="brand"
              value={productData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="price" className="form-label fw-bold">
                Price :
            </label>
            <input
              type="number"
              className="form-control"
              id="price"
              name="price"
              value={price}
              onChange={handlePriceChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="status" className="form-label fw-bold">
              Status :
            </label>
            <select
                className="form-select" 
                id="status"
                value={productData.status}
                name="status"
                onChange={handleChange}
                required
            >
                <option value="">-- Select Status --</option>
                <option value="active">Active</option>
                <option value="hidden">Hidden</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="category" className="form-label fw-bold">
              Category :
            </label>
            <select
                className="form-select" 
                id="category"
                value={productData.category}
                name="category"
                onChange={handleChange}
                required
            >
                <option value="">-- Select Category --</option>
                { category && category.map(cat => {
                    const {category, id, status} = cat;
                    return status === "active" ? (
                        <option key={id} value={category}>{category}</option>
                    ) : null;
                })}
            </select>
          </div>
          <div className="col-md-6">
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
          <div className="col-md-6" style={{ height: "100px", width: "100px" }}>
            <img
              className="mh-100 mw-100"
              src={image}
              alt=""
            />
          </div>
          <div className="col-12">
            <button type="submit" className="btn btn-primary mb-2 me-2">
              Add Product
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

export default ProductAdd;
