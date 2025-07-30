import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { AxiosError, HttpStatusCode } from "axios";

export const fetchTasksThunk = createAsyncThunk(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await jsonPlaceholderApi.get("/todos");

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Handle errors"); //TODO make the errors when request failed
      }
    }
  },
);
