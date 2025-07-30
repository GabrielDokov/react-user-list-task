import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { AxiosError, HttpStatusCode } from "axios";

export const deletePostByIdThunk = createAsyncThunk<number, number, { rejectValue: string }>(
  "posts/deletePostById",
  async (postId: number, { rejectWithValue }) => {
    try {
      await jsonPlaceholderApi.delete(`/posts/${postId}`);
      return postId;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Failed to delete post");
      }
      return rejectWithValue("Unknown error");
    }
  },
);
