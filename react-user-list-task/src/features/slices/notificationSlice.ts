import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { fetchTasksThunk } from "../thunks/fetchTasksThunk";
import { fetchPostsByUserIdThunk } from "../thunks/fetchPostsByUserIdThunk";
import { fetchUsersThunk } from "../thunks/fetchUsersThunk";
import { updatePostThunk } from "../thunks/updatePostThunk";
import { deletePostByIdThunk } from "../thunks/deletePostByIdThunk";

export type NotificationState = {
  hasError: boolean;
  message: string;
};

const initialState: NotificationState = {
  hasError: false,
  message: "",
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    resetError: (state) => {
      state.hasError = false;
      state.message = "";
    },
  },
  extraReducers: ({ addMatcher }) => {
    addMatcher(
      isAnyOf(
        fetchUsersThunk.rejected,
        fetchTasksThunk.rejected,
        fetchPostsByUserIdThunk.rejected,
        updatePostThunk.rejected,
        deletePostByIdThunk.rejected,
      ),
      (state, action) => {
        state.hasError = true;
        if (action.payload) {
          state.message = action.payload;
        }
      },
    );
  },
});

export const { resetError } = notificationSlice.actions;

export default notificationSlice.reducer;
