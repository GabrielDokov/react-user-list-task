import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { PostData } from "../../types/PostsData";
import { AxiosError, HttpStatusCode } from "axios";

export const updatePostThunk = createAsyncThunk(
  "posts/updatePost",
  async (postData: PostData, { rejectWithValue }) => {
    try {
      const response = await jsonPlaceholderApi.put(`/posts/${postData.id}`, postData);

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Handle errors"); //TODO make the errors when request failed
      }
    }
    return rejectWithValue("Handle errors");
  },
);
