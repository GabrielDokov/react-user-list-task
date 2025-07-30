import { createAsyncThunk } from "@reduxjs/toolkit";
import { jsonPlaceholderApi } from "../../api/jsonPlaceholderApi";
import { AxiosError, HttpStatusCode } from "axios";
import { UserData } from "../../types/UserData";

export const fetchUsersThunk = createAsyncThunk<UserData[], void, { rejectValue: string }>(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const usersInfo = await jsonPlaceholderApi.get("/users");

      return usersInfo.data;
    } catch (error) {
      if (error instanceof AxiosError && error.response?.status === HttpStatusCode.NotFound) {
        return rejectWithValue("Users not found");
      }
      return rejectWithValue("Unknown error");
    }
  },
);
