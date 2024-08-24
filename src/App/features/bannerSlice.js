import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, deleteConfig, patchConfigure, postConfigure } from "../../Api/api";
import { toast } from "react-toastify";

export const fetchBanner = createAsyncThunk(
    'banner/fetchBanner',
    async ({signal}) => {
        const res = await fetch(`${BASE_URL}/banner?_sort=id&_order=desc`, {signal});
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return data;
    }
);

export const addBanner = createAsyncThunk(
    'banner/addBanner',
    async ({bannerData}) => {
        const res = await fetch(`${BASE_URL}/banner`, postConfigure(bannerData));
        const data = await res.json();
        const status = res.ok;
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return {data, status};
    }
)

export const updateBanner = createAsyncThunk(
    'banner/updateBanner',
    async ({id, updateData}) => {
        const res = await fetch(`${BASE_URL}/banner/${id}`, patchConfigure(updateData));
        const data = await res.json();
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return {data, id};
    }
)

export const deleteBanner = createAsyncThunk(
    'banner/deleteBanner',
    async ({id}) => {
        const res = await fetch(`${BASE_URL}/banner/${id}`, deleteConfig());
        if (!res.ok) {
            throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        return {id};
    }
)

const bannerSlice = createSlice({
    name: 'banner',
    initialState: {
        banner: [],
        error: false
    },
    extraReducers: (builder) => {
        // fetch banner
        builder.addCase(fetchBanner.fulfilled, (state, action) => {
            state.error = false;
            state.banner = action.payload
        });
        builder.addCase(fetchBanner.rejected, (state, action) => {
            const error = action.error;

            if (error.name !== "AbortError") {
                state.error = error.message;
            }
        });

        // add banner
        builder.addCase(addBanner.pending, () => {
            toast.dismiss();
            toast.info('uploading')
        });
        builder.addCase(addBanner.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('banner uploaded')
            const { data } = action.payload
            state.banner.push(data)
        });
        builder.addCase(addBanner.rejected, (state, action) => {
            const error = action.error.message;
            
            toast.dismiss();
            toast.error(error)
        });

        // update banner
        builder.addCase(updateBanner.pending, () => {
            toast.dismiss();
            toast.info('updating')
        });
        builder.addCase(updateBanner.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('update complete')
            const { data, id } = action.payload;
            const targetIndex = state.banner.findIndex(ban => ban.id === id)

            state.banner[targetIndex] = { ...state.banner[targetIndex], ...data}
        });
        builder.addCase(updateBanner.rejected, (state, action) => {
            const error = action.error.message;
            
            toast.dismiss();
            toast.error(error)
        });

        // update banner
        builder.addCase(deleteBanner.pending, () => {
            toast.dismiss();
            toast.info('deleting')
        });
        builder.addCase(deleteBanner.fulfilled, (state, action) => {
            toast.dismiss();
            toast.success('deleted')
            const { id } = action.payload;
            state.banner = state.banner.filter(ban => ban.id !== id)
        });
        builder.addCase(deleteBanner.rejected, (state, action) => {
            const error = action.error.message;
            
            toast.dismiss();
            toast.error(error)
        });
    }
})

export default bannerSlice.reducer;