import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./productsApiSlice";
import productSlice from "./productSlice";

const store = configureStore({
  reducer: {
    products: productSlice,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
