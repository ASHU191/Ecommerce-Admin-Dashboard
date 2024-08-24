import { createSlice } from "@reduxjs/toolkit";


const adminAuthSlice = createSlice({
    name: 'adminAuth',
    initialState: {
        isLogedIn: undefined,
        adminData:{}
    },
    reducers:{
        login : (state, action) => {
            const userInfo = action.payload;
            state.isLogedIn = true;
            state.adminData = userInfo;

            const { email, password } = userInfo
            const loginData = { email, password }
            
            localStorage.setItem('adminAuthData', JSON.stringify(loginData))
        },

        notLogin : (state) => {
            state.isLogedIn = false;
            state.adminData = {};
        },

        logout : (state) => {
            localStorage.removeItem('adminAuthData')
            state.isLogedIn = false;
            state.adminData = {};
        },

        updateAdmin : (state, action) => {
            const { email, password } = action.payload;
            localStorage.setItem('adminAuthData', JSON.stringify({ email, password }))

            state.adminData = action.payload;
        }
    }
})

export const { login, notLogin, logout, updateAdmin } = adminAuthSlice.actions

export default adminAuthSlice.reducer