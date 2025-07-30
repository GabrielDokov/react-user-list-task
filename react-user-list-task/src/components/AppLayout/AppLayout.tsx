import { Layout } from "antd";
import { Outlet } from "react-router";
import MenuItems from "../MenuItems/MenuItems";
import classes from "./AppLayout.module.scss";

const AppLayout = () => (
  <Layout>
    <Layout.Sider className={classes.sider}>
      <MenuItems />
    </Layout.Sider>
    <Layout.Content className={classes.content}>
      <Outlet />
    </Layout.Content>
  </Layout>
);
export default AppLayout;
