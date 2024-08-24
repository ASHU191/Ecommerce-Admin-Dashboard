import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, deleteConfig, patchConfigure, postConfigure } from "../../Api/api";
import { toast } from "react-toastify";

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ({ signal }) => {
        const res = await fetch(`${BASE_URL}/products?_sort=id&_order=desc`, { signal })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return data
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async ({ id, updateData }) => {
        const res = await fetch(`${BASE_URL}/products/${id}`, patchConfigure(updateData))
        const data = await res.json()
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        const status = res.ok;
        return {data, id, status}
    }
)

export const addProduct = createAsyncThunk(
    'products/addProduct',
    async ({ productDetails }) => {
        const res = await fetch(`${BASE_URL}/products`, postConfigure(productDetails))
        const data = await res.json()
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        const status = res.ok;
        return { data, status }
    }
)

export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async ({id}) => {
        const res = await fetch(`${BASE_URL}/products/${id}`, deleteConfig())
        if (!res.ok) {
            throw new Error(res.statusText)
        }
        return  id
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        error: false,
        products: []
    },
    extraReducers: (builder) => {

        // fetching all product
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            state.error = false;
            state.products = action.payload;
        });
        builder.addCase(fetchProducts.rejected, (state, action) => {
            const error = action.error;
            if ( error.name !== 'AbortError') {
                state.error = error.message;
            }
        });

        // updating product
        builder.addCase(updateProduct.pending, () => {
            toast.dismiss();
            toast.info('Updating...')
        });
        builder.addCase(updateProduct.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Update Complete')
            const {data, id} = action.payload;
            const targetIndex = state.products.findIndex(product => product.id === Number(id));

            state.products[targetIndex] = { ...state.products[targetIndex], ...data}
        });
        builder.addCase(updateProduct.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message)
        });

        // delete product
        builder.addCase(deleteProduct.pending, () => {
            toast.dismiss();
            toast.info('Deleting...')
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Deleted')
            const id = action.payload;
            state.products = state.products.filter(product => product.id !== id)
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message)
        });

        // adding new product
        builder.addCase(addProduct.pending, () => {
            toast.dismiss();
            toast.info('uploading product...')
        });
        builder.addCase(addProduct.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('Product Uploaded')
            const product = action.payload.data;
            state.products.unshift(product);
        });
        builder.addCase(addProduct.rejected, (state, action) => {
            const error = action.error;
            toast.dismiss();
            toast.error(error.message)
        });
    }
})

export default productsSlice.reducer;