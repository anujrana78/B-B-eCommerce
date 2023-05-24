import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items : []
};

const wishlistSlice = createSlice({
    name : "wishlist",
    initialState,
    reducers : {
        addToWishlist: (state, action) => {
            const product = action.payload;
            const existingProduct = state.items.find(p => p.id === product.id);
            if (!existingProduct) {
              state.items.push(product);
            }
          },
          removeFromWishlist: (state, action) => {
            const productId = action.payload;
            const index = state.items.findIndex(p => p.id === productId);
            if (index !== -1) {
              state.items.splice(index, 1);
            }
          },
        
    }

})

export const {addToWishlist,removeFromWishlist} = wishlistSlice.actions 
export const wishlistReducer = wishlistSlice.reducer