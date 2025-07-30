import { createSlice, isAnyOf, PayloadAction } from "@reduxjs/toolkit";
import { TaskData } from "../../types/TaskData";
import { fetchTasksThunk } from "../thunks/fetchTasksThunk";

export type TasksState = {
  tasks: TaskData[];
  isLoading: boolean;
};

const initialState: TasksState = {
  tasks: [],
  isLoading: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    toggleTaskStatus: (state, action: PayloadAction<number>) => {
      const task = state.tasks.find((t) => t.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
  },
  extraReducers: ({ addCase, addMatcher }) => {
    addCase(fetchTasksThunk.fulfilled, (state, action: PayloadAction<TaskData[]>) => {
      state.tasks = action.payload;
      state.isLoading = false;
    });

    addMatcher(isAnyOf(fetchTasksThunk.pending), (state) => {
      state.isLoading = true;
    });
    addMatcher(isAnyOf(fetchTasksThunk.rejected), (state) => {
      state.isLoading = false;
    });
  },
});

export const { toggleTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
