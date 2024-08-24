import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../../Api/api";


export const fetchFrontendProducts = createAsyncThunk(
    'products/fetchFrontendProducts',
    async ({category, signal}) => {
        const res = await fetch(`${BASE_URL}/products?status=active&${category ? `category=${category}`:null}`, {signal})
        const data = await res.json();
        if(!res.ok){
            throw new Error(res.statusText)
        }

        return data;
    }
)

const frontendProductsSlice = createSlice({
    name: 'frontendProducts',
    initialState: {
        products: [],
        loading: true,
        error: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFrontendProducts.pending, (state) => {
            state.loading = true;
            state.error =  false;
        });
        builder.addCase(fetchFrontendProducts.fulfilled, (state,action) => {
            state.loading = false;
            state.error =  false;
            state.products = action.payload;
        });
        builder.addCase(fetchFrontendProducts.rejected, (state,action) => {
            const error = action.error;
            
            if ( error.name !== 'AbortError'){
                state.error =  error.message;
                state.loading = false;
            }

        });
    }
})

export default frontendProductsSlice.reducer;