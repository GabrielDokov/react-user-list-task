import { Menu } from "antd";
import useMenuItems from "./hooks/useMenuItems";
import { useState } from "react";
import { useNavigate } from "react-router";

const MenuItems = () => {
  const menuItems = useMenuItems();
  const [selectedKey, setSelectedKey] = useState("");
  const navigate = useNavigate();

  const handleMenuItemClick = ({ key }: { key: string }) => {
    setSelectedKey(key);
    navigate(key);
  };

  return (
    <Menu
      style={{ height: "100%" }}
      mode="inline"
      selectedKeys={[selectedKey]}
      items={menuItems}
      onClick={handleMenuItemClick}
    />
  );
};

export default MenuItems;
