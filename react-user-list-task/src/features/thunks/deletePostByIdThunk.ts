import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { AxiosError, HttpStatusCode } from "axios";

export const deletePostByIdThunk = createAsyncThunk(
  "posts/deletePostById",
  async (postId: number, { rejectWithValue }) => {
    try {
      await jsonPlaceholderApi.delete(`/posts/${postId}`);
      return postId;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Handle errors"); //TODO make the errors when request failed
      }
    }
    return rejectWithValue("Handle errors");
  },
);
