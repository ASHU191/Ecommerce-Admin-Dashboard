import { toast } from 'react-toastify'
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, patchConfigure, postConfigure } from "../../Api/api";

export const fetchCoupon = createAsyncThunk(
    'coupon/fetchCoupon',
    async ({signal}) => {
        const res = await fetch(`${BASE_URL}/coupon?_sort=id&_order=desc`, {signal})
        const data = await res.json()
        return data
    }
)

export const addCoupon = createAsyncThunk(
    'coupon/addCoupon',
    async ({postData}) => {
        const res = await fetch(`${BASE_URL}/coupon`, postConfigure(postData))
        const data = await res.json()
        return data
    }
)

export const updateCouponStatus = createAsyncThunk(
    'coupon/updateCouponStatus',
    async ({id, updateData}) => {
        const res = await fetch(`${BASE_URL}/coupon/${id}`, patchConfigure(updateData))
        const data = await res.json()
        return { id, data }
    }
)

export const updateCoupon = createAsyncThunk(
    'coupon/updatecoupon',
    async ({id, updateData}) => {
        const res = await fetch(`${BASE_URL}/coupon/${id}`, patchConfigure(updateData))
        const data = await res.json()
        const status = res.ok;
        return { id, data, status }
    }
)


const couponSlice = createSlice({
    name: 'coupon',
    initialState:{
        coupon: [],
        error: false
    },
    extraReducers: builder => {

        // fetch coupon
        builder.addCase(fetchCoupon.fulfilled, (state, action) => {
            state.error = false;
            state.coupon = action.payload
        });
        builder.addCase(fetchCoupon.rejected, (state, action) => {
            const error = action.error;

            if (error.name !== "AbortError") {
                state.error = error.message;
                state.coupon = []
            }
        });
        
        // Adding Coupon
        builder.addCase(addCoupon.pending, () => {
            toast.dismiss()
            toast.info('Ading Coupon')
        });
        builder.addCase(addCoupon.fulfilled, (state, action) => {
            toast.dismiss()
            toast.success('Coupon Added')

            state.coupon.unshift(action.payload)
        });
        builder.addCase(addCoupon.rejected, (state, action) => {
            const error = action.error.message;

            toast.dismiss()
            toast.error(error)
        });
        
        // Updating Coupon Status
        builder.addCase(updateCouponStatus.pending, () => {
            toast.dismiss()
            toast.info('updating')
        });
        builder.addCase(updateCouponStatus.fulfilled, (state, action) => {
            toast.dismiss()
            toast.success('updated')

            const { id, data } = action.payload;
            const targetIndex = state.coupon.findIndex(coupon=> coupon.id === id);
            state.coupon[targetIndex] = { ...state.coupon[targetIndex], ...data}
        });
        builder.addCase(updateCouponStatus.rejected, (state, action) => {
            const error = action.error.message;

            toast.dismiss()
            toast.error(error)
        });

        // Updating Coupon
        builder.addCase(updateCoupon.pending, () => {
            toast.dismiss()
            toast.info('updating')
        });
        builder.addCase(updateCoupon.fulfilled, (state, action) => {
            toast.dismiss()
            toast.success('updated')

            const { id, data } = action.payload;
            const targetIndex = state.coupon.findIndex(coupon=> coupon.id === id);
            state.coupon[targetIndex] = { ...state.coupon[targetIndex], ...data}
        });
        builder.addCase(updateCoupon.rejected, (state, action) => {
            const error = action.error.message;
            toast.dismiss()
            toast.error(error)
        });
    }
})

export default couponSlice.reducer