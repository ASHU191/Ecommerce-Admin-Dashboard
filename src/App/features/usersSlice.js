import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, deleteConfig, patchConfigure, postConfigure } from "../../Api/api";
import { toast } from 'react-toastify'

export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async ({signal}) => {
        const res = await fetch(`${BASE_URL}/users?_sort=id&_order=desc`, {signal})
        const data = await res.json()
        return data
    }
)

export const addUser = createAsyncThunk(
    'users/addUser',
    async (userData) => {
        const res = await fetch(`${BASE_URL}/users`, postConfigure(userData))
        const data = await res.json()
        const status = res.ok;

        return { data, status}
    }
)

export const updateUser = createAsyncThunk(
    'users/updateUser',
    async ({id, updateData}) => {
        const res = await fetch(`${BASE_URL}/users/${id}`, patchConfigure(updateData))
        const data = await res.json()
        const status = res.ok
        return { id, data, status }
    }
)

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (id) => {
        const res = await fetch(`${BASE_URL}/users/${id}`, deleteConfig());
        if (!res.ok){
            throw new Error(res.statusText)
        }
        return id
    }
)

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        users: [],
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.error = false;
            state.users = action.payload
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            const error = action.error
            
            if (error.name !== "AbortError") {
                state.error = error.message;
                state.users = []
            }
        });

        builder.addCase(addUser.pending, () => {
            toast.dismiss();
            toast.info('Adding User')
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('User Added')

            const { data } = action.payload;
            state.users.unshift(data)
        });
        builder.addCase(addUser.rejected, (state, action) => {
            const error = action.error
            toast.dismiss();
            toast.error(error.message)
        });

        builder.addCase(updateUser.pending, () => {
            toast.dismiss()
            toast.info('updating')
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            toast.dismiss()
            toast.success('update complete')

            const { id, data } = action.payload
            const targetIndex = state.users.findIndex(user => user.id === Number(id))

            
            state.users[targetIndex] = { ...state.users[targetIndex], ...data }
            
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            const error = action.error
            toast.dismiss()
            toast.error(error.message)
        });

        builder.addCase(deleteUser.pending, () => {
            toast.dismiss()
            toast.info('deleteing')
        });
        builder.addCase(deleteUser.fulfilled, (state, action) => {
            toast.dismiss()
            toast.success('delete success')

            const id = action.payload
            state.users = state.users.filter(user => user.id !== id )
        });
        builder.addCase(deleteUser.rejected, (state, action) => {
            const error = action.error
            toast.dismiss()
            toast.error(error.message)
        });
    }
})

export default usersSlice.reducer