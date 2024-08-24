import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, postConfigure } from "../../Api/api";

const CategoryAdd = () => {

    const navigate = useNavigate()

    const [ category, setCategory ] = useState({category:'', status: ''})

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setCategory(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        toast.dismiss()
        toast.info('uploading category')
        
        fetch(`${BASE_URL}/category`, postConfigure(category))
        .then(res => {
            if (!res.ok){
                throw new Error(`Error ${res.status}: ${res.statusText}`)
            } else {
                toast.dismiss()
                toast.success('category uploaded')
                setCategory({category:'', status: ''})
                navigate('/admin/category')
            }
        })
        .catch ( err => {
            toast.dismiss()
            toast.error(err.message)
        })
    }

  return (
    <>
      <div className="container">
        <div className="card  my-5 mx-auto" style={{maxWidth: '500px'}}>
          <div className="card-header py-3 ">
            <h3 className="fw-bold">Add Category</h3>
          </div>
          <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3 mt-3">
                <label
                 htmlFor="category" 
                 className="form-label fw-bold"
                >
                    Category :
                </label>
                <input
                 type="category" 
                 id="category" 
                 className="form-control" 
                 placeholder="Enter category name" 
                 name="category" 
                 value={category.category}
                 onChange={handleChange}
                 required
                />
            </div>
            <div className="mb-3">
                <label
                 className="form-label fw-bold" 
                 htmlFor="status"
                >
                    Status :
                </label>
                <select
                 className="form-select" 
                 id="status"
                 value={category.status}
                 name="status"
                 onChange={handleChange}
                 required
                >
                    <option value="">-- Select Status --</option>
                    <option value="active">Active</option>
                    <option value="hidden">Hidden</option>
                </select>
            </div>
            <button
             type="submit" 
             className="btn btn-sm btn-primary"
            >
                Add Category
            </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoryAdd;
