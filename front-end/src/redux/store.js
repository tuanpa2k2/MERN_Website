import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slides/counterSlide.js";
import useReducer from "./slides/userSlide.js";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: useReducer,
  },
});
