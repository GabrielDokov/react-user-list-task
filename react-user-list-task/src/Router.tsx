import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import UserList from "./components/UserList/UserList";
import UserPosts from "./components/UserPosts/UserPosts";
import UserTasks from "./components/UserTasksTable/UserTasksTable";
import AppLayout from "./components/AppLayout/AppLayout";
import { routePaths } from "./routerConfig";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path={routePaths.users.path} element={<AppLayout />}>
        <Route path={routePaths.users.path} element={<UserList />} />
        <Route path={routePaths.posts.path} element={<UserPosts />} />
        <Route path={routePaths.tasks.path} element={<UserTasks />}></Route>
      </Route>
    </>,
  ),
);

const Router = () => <RouterProvider router={router} />;

export default Router;
