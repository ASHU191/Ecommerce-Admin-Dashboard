import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { BASE_URL, deleteConfig, patchConfigure } from "../../Api/api";

export const fetchCategory = createAsyncThunk(
  "category",
  async ({ signal }) => {
    const res = await fetch(`${BASE_URL}/category?_sort=id&_order=desc`, {
      signal,
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }
    return data;
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id) => {
    const res = await fetch(`${BASE_URL}/category/${id}`, deleteConfig());
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${res.statusText}`);
    }

    return id;
  }
);

export const updateCategoryStatus = createAsyncThunk(
  "category/updateCategoryStatus",
  async ({ id, updateData }) => {
    const res = await fetch(
      `${BASE_URL}/category/${id}`,
      patchConfigure(updateData)
    );
    const data = await res.json();
    return { id, data };
  }
);

const categorySlice = createSlice({
  name: "category",
  initialState: {
    category: [],
    error: false,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.error = false;
      state.category = action.payload;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      const error = action.error;

      if (error.name !== "AbortError") {
        state.error = error.message;
        state.category = [];
      }
    });
    

    builder.addCase(updateCategoryStatus.pending, () => {
      toast.dismiss();
      toast.info("updating...");
    });
    builder.addCase(updateCategoryStatus.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("update success");

      const { id, data } = action.payload;
      const targetIndex = state.category.findIndex(
        (category) => category.id === id
      );

      state.category[targetIndex] = { ...state.category[targetIndex], ...data };
    });
    builder.addCase(updateCategoryStatus.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });


    builder.addCase(deleteCategory.pending, () => {
      toast.dismiss();
      toast.info("deleting...");
    });
    builder.addCase(deleteCategory.fulfilled, (state, action) => {
      toast.dismiss();
      toast.success("deleted");

      state.category = state.category.filter(
        (category) => category.id !== action.payload
      );
    });
    builder.addCase(deleteCategory.rejected, (state, action) => {
      const error = action.error;
      toast.dismiss();
      toast.error(error.message);
    });
  },
  reducers: {},
});

export default categorySlice.reducer;
