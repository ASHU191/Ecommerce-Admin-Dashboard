import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, patchConfigure } from "../../Api/api";
import { updateAdmin } from "../../App/features/adminAuthSlice";
import dummyImage from '../../Assets/profile.png'

const ProfileEdit = () => {
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { adminData } = useSelector(state => state.adminAuth)

    const initialState = {
        username: adminData.username ? adminData.username : '',
        email: adminData.email,
        phone: adminData.phone,
        house: adminData.house ? adminData.house : '',
        street: adminData.street ? adminData.street : '',
        state: adminData.state ? adminData.state : '',
        country: adminData.country ? adminData.country : '',
        image: adminData.image ? adminData.image : ''
    }

    const [ profileData, setProfileData ] = useState(initialState)
    
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setProfileData(prev => ({...prev, [name]: value}))
    }

    const handleImageChange = (e) => {
      const file = e.target.files[0]
      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", `${process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET}`)

      toast.dismiss();
      toast.info('uploading image....')
  
      fetch( `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_UPLOAD_API_KEY}/image/upload`, {
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
        setProfileData(prev=> ({...prev, image: data.url}))
      })
      .catch(error => {
          toast.dismiss();
          toast.error('image upload failed')
          console.log(error)
      })
    };
    
    const handleSubmit = (e) => {
        e.preventDefault()

        const id = adminData.id;

        toast.dismiss()
        toast.info('updating...')
        
        fetch(`${BASE_URL}/users/${id}`, patchConfigure(profileData))
        .then(res => {
            if (!res.ok){
                throw new Error(res.statusText)
            } else {
                toast.dismiss()
                toast.success('Profile Updated')
                return res.json()
            }
        })
        .then(data => {
            dispatch(updateAdmin(data))
            setTimeout(()=> {
                navigate(-1)
            }, 500)
        })
        .catch(err => {
            toast.dismiss()
            toast.error(err.message)
        })
    }

  return (
    <div className="container" style={{maxWidth: "768px"}}>
      <form
         className="row g-3 my-5 shadow p-2 rounded"
         onSubmit={handleSubmit}
      >
        <div className="h4 text-center mb-3">Edit Profile</div>
        <div className="col-12 d-flex align-items-center">
          <h4>Email :</h4>
          <h4 className="ms-3">{profileData.email}</h4>
        </div>
        <div className="col-md-6">
          <label htmlFor="name" className="form-label fw-bold">
            Name :
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="username"
            value={profileData.username}
            onChange={handleChange}
            required
            />
        </div>
        <div className="col-md-6">
          <label htmlFor="phone" className="form-label fw-bold">
            Phone :
          </label>
          <input 
            id="phone" 
            type="number" 
            className="form-control"
            name="phone"
            value={profileData.phone} 
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="house" className="form-label fw-bold">
            House :
          </label>
          <input
            type="text" 
            className="form-control" 
            id="house" 
            name="house"
            value={profileData.house}
            onChange={handleChange}
           />
        </div>
        <div className="col-md-6">
          <label htmlFor="street" className="form-label fw-bold">
            Street :
          </label>
          <input
             type="text" 
             className="form-control" 
             id="street" 
             name="street"
             value={profileData.street}
            onChange={handleChange}
           />
        </div>
        <div className="col-md-6">
          <label htmlFor="state" className="form-label fw-bold">
            State :
          </label>
          <input
           type="text" 
           className="form-control" 
           id="state" 
           name="state"
           value={profileData.state}
           onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="country" className="form-label fw-bold">
            Country :
          </label>
          <input
           type="text" 
           className="form-control" 
           id="country" 
           name="country"
           value={profileData.country}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-6">
          <label htmlFor="image" className="form-label fw-bold">
            Change Image :
          </label>
          <input
           type="file" 
           className="form-control" 
           id="image" 
            onChange={handleImageChange}
          />
        </div>
        <div className="col-md-6" style={{height: '100px', width: "100px"}}>
            <img className="mh-100 mw-100" src={profileData.image ? profileData.image : dummyImage} alt='' />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary mb-2 me-2">
            Update Profile
          </button>
          <button
             type="button" 
             className="btn btn-danger mb-2 ms-2"
             onClick={()=> navigate(-1)}
          >
            Back
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;
