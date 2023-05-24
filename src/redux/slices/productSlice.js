import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  items: [],
  loading: true,
  error: null,
};

export const fetchProduct = createAsyncThunk(
  "product/fetchProducts",
  async () => {
    const response = await fetch(
      "https://bed-and-bunk-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Something went wrong fethcing the data from firebase");
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.items = action.payload;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

// export const fetchProduct = () => {
//   return async (dispatch) => {
//     const fetchData = async () => {
//       dispatch(setLoading(true))
//       const response = await fetch(
//         "https://bed-and-bunk-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
//       );
//       if (response.ok) {
//         const data = await response.json();
//         dispatch(setLoading(false));
//         return data;
//       }else {
//         dispatch(setLoading(false))
//         throw new Error("Something went wrong fethcing the data from firebase");

//       }

//     };
//     try {
//       const productData = await fetchData();
//       dispatch(setProduct(productData));
//     } catch (error) {
//       console.log(error);
//     }
//   };
// };

export const { setProduct } = productSlice.actions;
export const productReducer = productSlice.reducer;
