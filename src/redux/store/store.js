import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import apiReducer from "../slices/apiSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    api: apiReducer,
  },
});

export default store;
