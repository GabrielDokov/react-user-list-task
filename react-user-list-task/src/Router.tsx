import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import UserList from "./components/UserList/UserList";
import UserPosts from "./components/UserPosts/UserPosts";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<UserList />} />
      <Route path="/posts/:userId" element={<UserPosts />} />
    </>,
  ),
);

const Router = () => <RouterProvider router={router} />;

export default Router;
