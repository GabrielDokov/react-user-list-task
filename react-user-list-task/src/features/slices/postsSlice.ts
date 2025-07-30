import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { PostData } from "../../types/PostsData";
import { fetchPostsByUserIdThunk } from "../thunks/fetchPostsByUserIdThunk";
import { deletePostByIdThunk } from "../thunks/deletePostByIdThunk";
import { updatePostThunk } from "../thunks/updatePostThunk";

export type PostsState = {
  posts: PostData[];
  isLoading: boolean;
};

const initialState: PostsState = {
  posts: [],
  isLoading: false,
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: ({ addCase, addMatcher }) => {
    addCase(fetchPostsByUserIdThunk.fulfilled, (state, action: PayloadAction<PostData[]>) => {
      state.posts = action.payload;
      state.isLoading = false;
    });
    addCase(deletePostByIdThunk.fulfilled, (state, action: PayloadAction<number>) => {
      if (action.payload) {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      }
      state.isLoading = false;
    });
    addCase(updatePostThunk.fulfilled, (state, action: PayloadAction<PostData>) => {
      const index = state.posts.findIndex((post) => post.id === action.payload.id);

      if (index !== -1) {
        state.posts[index] = action.payload;
      }
      state.isLoading = false;
    });

    addMatcher(
      isAnyOf(
        fetchPostsByUserIdThunk.pending,
        deletePostByIdThunk.pending,
        updatePostThunk.pending,
      ),
      (state) => {
        state.isLoading = true;
      },
    );
    addMatcher(
      isAnyOf(
        fetchPostsByUserIdThunk.rejected,
        deletePostByIdThunk.rejected,
        updatePostThunk.rejected,
      ),
      (state) => {
        state.isLoading = false;
      },
    );
  },
});

export default postsSlice.reducer;
