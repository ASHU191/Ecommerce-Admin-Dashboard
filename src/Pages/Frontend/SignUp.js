import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { BASE_URL, postConfigure } from "../../Api/api";
import { login } from "../../App/features/customerAuthSlice";

const SignUp = () => {
    
    const dispatch = useDispatch()

    const { isLogedIn } = useSelector(state => state.customerAuth)

    const initialState = { username: '', password: '', email: '', phone: '', house: '', street: '', state: '', country: '', image: '', status: "active" }

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
        toast.dismiss()
        toast.info('Creating account...')
        
        fetch(`${BASE_URL}/customers`)
        .then(res => res.json())
        .then(data => {
            const emailCheck = data.some(data => data.email === profileData.email)
            if (emailCheck){
                toast.dismiss();
                toast.error('A user already use this email')
            } else {
                fetch(`${BASE_URL}/customers`, postConfigure(profileData))
                .then(res => res.json())
                .then(data => {
                    toast.dismiss()
                    toast.success('Account Created')

                    setProfileData(initialState)
                    dispatch(login(data))
                })
                .catch(error => {
                    toast.dismiss();
                    toast.error(error.message)
                })
            }
        })
        .catch(error => {
            toast.dismiss();
            toast.error(error.message)
        })
    }



    if (isLogedIn){
        return <Navigate to={'/'} />
    } else if (isLogedIn === false) {

        return (
          <div className="container" style={{maxWidth: "700px"}}>
            <form
               className="row g-2 my-4 shadow p-2 rounded"
               onSubmit={handleSubmit}
            >
              <div className="h4 text-center mb-2">Create Account</div>
              <div className="col-md-12">
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
              <div className="col-md-12">
                <label htmlFor="password" className="form-label fw-bold">
                password :
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  value={profileData.password}
                  onChange={handleChange}
                  required
                  />
              </div>
              <div className="col-md-6">
                <label htmlFor="email" className="form-label fw-bold">
                  Email :
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={profileData.email}
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
                  Image :
                </label>
                <input
                 type="file" 
                 className="form-control" 
                 id="image" 
                  onChange={handleImageChange}
                />
              </div>
              <div className="col-md-6" style={{height: '100px', width: "100px"}}>
                  <img className="mh-100 mw-100" src={profileData.image} alt='' />
              </div>
              <button type="submit" className="btn btn-primary mb-2 me-2">
                  Submit
              </button>
              <div className="text-center mb-2">
                  <span>Already have a account? </span>
                  <span><Link to={'/login'}> Log in</Link></span>
              </div>
            </form>
          </div>
        );
    }

};

export default SignUp;
