import { combineReducers } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfoSlice";
import posts from "./slices/postsSlice";

const rootReducer = combineReducers({
  userInfo,
  posts,
});

export default rootReducer;
