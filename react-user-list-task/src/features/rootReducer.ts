import { combineReducers } from "@reduxjs/toolkit";
import userInfo from "./slices/userInfoSlice";
import posts from "./slices/postsSlice";
import tasks from "./slices/tasksSlice";
import notification from "./slices/notificationSlice";

const rootReducer = combineReducers({
  userInfo,
  posts,
  tasks,
  notification,
});

export default rootReducer;
