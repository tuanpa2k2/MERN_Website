import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slides/productSlide";
import orderReducer from "./slides/orderSlide";
import useReducer from "./slides/userSlide";

export const store = configureStore({
  reducer: {
    product: productReducer,
    order: orderReducer,
    user: useReducer,
  },
});
