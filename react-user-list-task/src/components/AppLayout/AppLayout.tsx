import { Layout } from "antd";
import React from "react";
import { Outlet } from "react-router";
import MenuItems from "../MenuItems/MenuItems";

const AppLayout = () => (
  <Layout>
    <Layout.Sider style={{ height: "100dvh" }}>
      <MenuItems />
    </Layout.Sider>
    <Layout.Content style={{ padding: 24, maxHeight: "100vh", overflow: "auto" }}>
      <Outlet />
    </Layout.Content>
  </Layout>
);
export default AppLayout;
