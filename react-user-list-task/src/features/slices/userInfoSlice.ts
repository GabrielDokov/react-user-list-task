import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { fetchUsersThunk } from "../thunks/fetchUsersThunk";
import { UserData } from "../../types/UserData";

export type UsersState = {
  users: UserData[];
  isLoading: boolean;
};

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

const userInfoSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    updateUser: (state, action: PayloadAction<UserData>) => {
      const index = state.users.findIndex((user) => user.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = action.payload;
      }
    },
  },
  extraReducers: ({ addCase, addMatcher }) => {
    addCase(fetchUsersThunk.fulfilled, (state, action: PayloadAction<UserData[]>) => {
      state.users = action.payload;
      state.isLoading = false;
    });

    addMatcher(isAnyOf(fetchUsersThunk.pending), (state) => {
      state.isLoading = true;
    });
    addMatcher(isAnyOf(fetchUsersThunk.rejected), (state) => {
      state.isLoading = false;
    });
  },
});

export const { updateUser } = userInfoSlice.actions;

export default userInfoSlice.reducer;
