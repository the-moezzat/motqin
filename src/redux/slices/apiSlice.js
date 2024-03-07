// apiSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { baseURL } from "../api/url";

const initialState = {
  data: null,
  loading: false,
  error: null,
  post: { data: null, loading: false, error: null },
  delete: { data: null, loading: false, error: null },
};

export const fetchData = createAsyncThunk(
  "api/fetchData",
  async ({ endpoint, params }) => {
    const token = localStorage.getItem("token");
    const response = await axios.get(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: params, // Pass pagination parameters here
    });
    return response.data;
  }
);

export const updateData = createAsyncThunk(
  "api/updateData",
  async (endpoint, data) => {
    const response = await axios.put(`${baseURL}${endpoint}`, data);
    return response.data;
  }
);

export const deleteData = createAsyncThunk(
  "api/deleteData",
  async ({ endpoint }) => {
    const token = localStorage.getItem("token");

    await axios.delete(`${baseURL}${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return 0;
  }
);

export const postData = createAsyncThunk(
  "api/postData",
  async ({ endpoint, data }) => {
    console.log("endpoint from post", endpoint);
    console.log("prompt from post", data);
    const token = localStorage.getItem("token");
    // const response = await axios.post(`${baseURL}${endpoint}`, data, {
    const response = await axios.post(
      `https://srv475086.hstgr.cloud/api/${endpoint}`,
      { prompt: data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }
);

const apiSlice = createSlice({
  name: "api",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.data = null;
        state.error = action.error.message;
      })
      .addCase(updateData.fulfilled, (state, action) => {
        // Handle update data success
      })
      .addCase(deleteData.fulfilled, (state, action) => {
        // Handle delete data success
        state.delete.loading = false;
        state.delete.error = null;
      })
      .addCase(deleteData.rejected, (state, action) => {
        state.delete.loading = false;
        state.delete.data = null;
        state.delete.error = action.error.message;
      })
      .addCase(deleteData.pending, (state) => {
        state.delete.loading = true;
      })
      .addCase(postData.fulfilled, (state, action) => {
        // Handle post data success
        state.post.loading = false;
        state.post.error = null;
      })
      .addCase(postData.rejected, (state, action) => {
        state.post.loading = false;
        state.post.data = null;
        state.post.error = action.error.message;
      })
      .addCase(postData.pending, (state) => {
        state.post.loading = true;
      });
  },
});

export default apiSlice.reducer;
