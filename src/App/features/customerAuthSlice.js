

import { createSlice } from "@reduxjs/toolkit";


const customerAuthSlice = createSlice({
    name: 'customerAuth',
    initialState: {
        isLogedIn: undefined,
        customerData:{}
    },
    reducers:{
        login : (state, action) => {
            const userInfo = action.payload;
            state.isLogedIn = true;
            state.customerData = userInfo;

            const { email, password } = userInfo
            const loginData = { email, password }
            
            localStorage.setItem('customerAuthData', JSON.stringify(loginData))
        },

        notLogin : (state) => {
            state.isLogedIn = false;
            state.customerData = {};
        },

        logout : (state) => {
            localStorage.removeItem('customerAuthData')
            state.isLogedIn = false;
            state.customerData = {};
        },

        updateCustomer : (state, action) => {
            const { email, password } = action.payload;
            localStorage.setItem('customerAuthData', JSON.stringify({ email, password }))

            state.customerData = action.payload;
        }
    }
})

export const { login, notLogin, logout, updateCustomer } = customerAuthSlice.actions

export default customerAuthSlice.reducer