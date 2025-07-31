import { Layout } from "antd";
import { Outlet } from "react-router";
import MenuItems from "../MenuItems/MenuItems";
import classes from "./AppLayout.module.scss";
import { useEffect } from "react";
import { fetchUsersThunk } from "../../features/thunks/fetchUsersThunk";
import { useAppDispatch } from "../../store";
import { fetchTasksThunk } from "../../features/thunks/fetchTasksThunk";

const AppLayout = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchTasksThunk());
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <Layout>
      <Layout.Sider className={classes.sider}>
        <MenuItems />
      </Layout.Sider>
      <Layout.Content className={classes.content}>
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
export default AppLayout;
