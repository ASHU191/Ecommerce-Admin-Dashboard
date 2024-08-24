import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, patchConfigure } from "../../Api/api";
import { toast } from "react-toastify";

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ({signal}) => {
        const res = await fetch(`${BASE_URL}/orders?_sort=id&_order=desc`, {signal});
        const data = await res.json();

        if (!res.ok){
            throw new Error(res.statusText)
        }

        return data
    }
)

export const updateOrderStatus = createAsyncThunk(
    'orders/updateOrderStatus',
    async ({ id, updateData}) => {
        const res = await fetch(`${BASE_URL}/orders/${id}`, patchConfigure(updateData))
        const data = await res.json();
        const status = res.ok
        return { id, data, status}
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        error: false,
        orders: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrders.fulfilled, (state, action) => {
            state.error = false;
            state.orders = action.payload;
        });
        builder.addCase(fetchOrders.rejected, (state, action) => {
            const error = action.error
            state.orders = []

            if (error.name !== 'AbortError'){
                state.error = error.message
            }
        });
        
        builder.addCase(updateOrderStatus.pending, (state) => {
            toast.dismiss();
            toast.info('Updating');
        });
        builder.addCase(updateOrderStatus.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Updating');
            const { id, data } = action.payload;

            const targetIndex = state.orders.findIndex(order => order.id === Number(id));
            if(targetIndex) {
                state.orders[targetIndex] = { ...state.orders[targetIndex], ...data}
            }
        });
        builder.addCase(updateOrderStatus.rejected, (state, action) => {
            const error = action.error
            toast.dismiss();
            toast.error(error.message);
        });
    }
})

export default ordersSlice.reducer