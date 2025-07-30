import { combineReducers } from "@reduxjs/toolkit";
import userInfoSlice from "./slices/userInfoSlice";

const rootReducer = combineReducers({
  userInfoSlice,
});

export default rootReducer;
