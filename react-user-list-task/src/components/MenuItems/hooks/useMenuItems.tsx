import { ItemType } from "antd/es/menu/interface";
import { UserOutlined, CheckSquareOutlined } from "@ant-design/icons";
import { routePaths } from "../../../routerConfig";

const useMenuItems = () => {
  const menuItems: ItemType[] = [
    {
      key: routePaths.users.path,
      icon: <UserOutlined />,
      label: "Users",
    },
    {
      key: routePaths.tasks.path,
      icon: <CheckSquareOutlined />,
      label: "Tasks",
    },
  ];

  return menuItems;
};

export default useMenuItems;
