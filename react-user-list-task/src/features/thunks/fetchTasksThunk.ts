import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { AxiosError, HttpStatusCode } from "axios";
import { TaskData } from "../../types/TaskData";

export const fetchTasksThunk = createAsyncThunk<TaskData[], void, { rejectValue: string }>(
  "tasks/fetchTasks",
  async (_, { rejectWithValue }) => {
    try {
      const response = await jsonPlaceholderApi.get("/todos");

      return response.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Tasks not found");
      }
      return rejectWithValue("Unknown error");
    }
  },
);
