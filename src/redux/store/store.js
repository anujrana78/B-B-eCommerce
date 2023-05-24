import { configureStore } from "@reduxjs/toolkit"
import { cartReducer } from "../slices/cartSlice";
import { wishlistReducer } from "../slices/wishlist";
import { productReducer } from "../slices/productSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage';


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const wishlistConfig = {
    key : 'wishlist',
    version :1 ,
    storage
  }

  const cartpersistedReducer = persistReducer(persistConfig, cartReducer)
  const wishlistpersistedReducer = persistReducer(wishlistConfig,wishlistReducer)
  
const store = configureStore({
    reducer : {
        cart : cartpersistedReducer,
        wishlist : wishlistpersistedReducer,
        products : productReducer,
    },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}
)

export let persistor = persistStore(store)
export default store; 