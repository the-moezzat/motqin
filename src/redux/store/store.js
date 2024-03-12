import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../slices/loginSlice";
import apiReducer from "../slices/apiSlice";
import chatReducer from "../slices/chatSlice";

const store = configureStore({
  reducer: {
    login: loginReducer,
    api: apiReducer,
    chat: chatReducer,
  },
});

export default store;
