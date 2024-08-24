import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { BASE_URL } from '../../Api/api'
import { login } from '../../App/features/adminAuthSlice'

const Login = () => {

    const dispatch = useDispatch()
    const { isLogedIn } = useSelector(state => state.adminAuth)

    const [ loginData, setLoginData ] = useState({email: '', password: ''})
    const { email, password } = loginData;

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value

        setLoginData(prev => ({...prev, [name]: value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch(`${BASE_URL}/users`)
        .then(res => {
            if (!res.ok){
                throw new Error(res.status)
            } else {
                return res.json()
            }
        })
        .then (data => {
            const userInfo = data.find(data => data.email === email)

            if(userInfo) {

                if( userInfo.email === email && userInfo.password !== password ) {
                    toast.dismiss()
                    toast.error('email & password don\'t match')
                } else if (userInfo.email === email && userInfo.password === password && userInfo.status !== 'active'){
                    toast.dismiss()
                    toast.error('Your account is deactivated by super admin')
                } else if ( userInfo.email === email && userInfo.password === password && userInfo.status === 'active' ) {
                    dispatch(login(userInfo))
                }
                
            } else {
                toast.dismiss()
                toast.error('no user is registered with this email')
            }
        })
        .catch(err => console.log(err))
    }

    const dummyLogin = () => {
        
        const dummyEmail = 'guest@dummy.com';

        fetch(`${BASE_URL}/users`)
        .then(res => {
            if (!res.ok){
                throw new Error(res.status)
            } else {
                return res.json()
            }
        })
        .then (data => {
            const userInfo = data.find(data => data.email === dummyEmail)

            if(userInfo) {
                dispatch(login(userInfo))
            }
        })
        .catch(err => console.log(err))
    }

    if (isLogedIn){
        return <Navigate to={'/admin'} />
    } else if (isLogedIn === false){
        return (
      
          <div className="position-fixed top-0 start-0 bottom-0 end-0 bg-light">
              <div className="row justify-content-center p-4">
                  <div className="col-lg-5">
                      <div className="card shadow-lg border-0 rounded-lg mt-5">
                          <div className="card-header">
                              <h3 className="text-center font-weight-light">Login</h3>
                          </div>
                          <div className="card-body">
                              <form onSubmit={handleSubmit}>
                                  <div className="mb-3 mt-3">
                                      <label htmlFor="email" className="form-label">Email:</label>
                                      <input
                                       id="email" 
                                       className="form-control" 
                                       type="email" 
                                       placeholder="Enter email"
                                       name="email" 
                                       value={loginData.email}
                                       onChange={handleChange}
                                       required
                                      />
                                  </div>
                                  <div className="mb-3">
                                      <label htmlFor="pwd" className="form-label">Password:</label>
                                      <input
                                       id="pwd" 
                                       className="form-control" 
                                       type="password" 
                                       placeholder="Enter password" 
                                       name="password" 
                                       value={loginData.password}
                                       onChange={handleChange}
                                       required
                                      />
                                  </div>
                                  <button
                                   type="submit" 
                                   className="btn btn-primary"
                                  >
                                      Submit
                                  </button>
                                  <button
                                    className='ms-3 btn btn-success'
                                    type='button'
                                    onClick={dummyLogin}
                                  >
                                    Dummy Login
                                  </button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
        )
    }

}

export default Login