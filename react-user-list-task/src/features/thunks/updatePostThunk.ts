import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { PostData } from "../../types/PostsData";
import { AxiosError, HttpStatusCode } from "axios";

export const updatePostThunk = createAsyncThunk<PostData, PostData, { rejectValue: string }>(
  "posts/updatePost",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await jsonPlaceholderApi.put(`/posts/${postData.id}`, postData);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Failed to update post");
      }
      return rejectWithValue("Unknown error");
    }
  },
);
