import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, patchConfigure } from "../../Api/api";
import { toast } from "react-toastify";

export const fetchCoustomers = createAsyncThunk(
    'customers/fetchCustomers',
    async ({signal}) => {
        const res = await fetch(`${BASE_URL}/customers?_sort=id&_order=desc`, {signal})
        const data = await res.json()
        return data
    }
)

export const updateCustomer = createAsyncThunk(
    'customers/updateCustomer',
    async ({id, updateData}) => {
        const res = await fetch(`${BASE_URL}/customers/${id}`, patchConfigure(updateData))
        const data = await res.json()
        return { id, data };
    }
)


const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        error: false,
        customers: []
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCoustomers.fulfilled, (state, action) => {
            state.error = false;
            state.customers = action.payload;
        });
        builder.addCase(fetchCoustomers.rejected, (state, action) => {
            const error = action.error;
            if (error.name !== 'AbortError'){
                state.error = error.message
                state.customers = [];
            }
        });

        builder.addCase(updateCustomer.pending, () => {
            toast.dismiss()
            toast.info('Updating...')
        })
        builder.addCase(updateCustomer.fulfilled, (state, action) => {
            toast.dismiss()
            toast.success('Update Complete')

            const { id, data } = action.payload;
            const targetIndex = state.customers.findIndex(customer => customer.id === id);
            state.customers[targetIndex] = { ...state.customers[targetIndex], ...data};

        })
        builder.addCase(updateCustomer.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss()
            toast.error(error.message)
        })
    }
})

export default customersSlice.reducer;