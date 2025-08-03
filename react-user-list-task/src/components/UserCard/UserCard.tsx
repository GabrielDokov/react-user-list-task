import { Card, Descriptions } from "antd";
import { ReactNode } from "react";
import { UserData } from "../../types/UserData";
import { useTranslation } from "react-i18next";

type Props = {
  user: UserData;
  extra?: ReactNode;
  children?: ReactNode;
};

const UserCard = ({ user, children, extra }: Props) => {
  const { t } = useTranslation();

  return (
    <Card title={user.name} extra={extra}>
      <Descriptions title={t("userData.title")} size="small">
        <Descriptions.Item label={t("userData.name")}>{user.name}</Descriptions.Item>
        <Descriptions.Item label={t("userData.username")}>{user.username}</Descriptions.Item>
        <Descriptions.Item label={t("userData.email")}>{user.email}</Descriptions.Item>
        <Descriptions.Item label={t("userData.phone")}>{user.phone}</Descriptions.Item>
        <Descriptions.Item label={t("userData.website")}>{user.website}</Descriptions.Item>
        <Descriptions.Item label={t("userData.city")}>{user.address.city}</Descriptions.Item>
        <Descriptions.Item label={t("userData.street")}>{user.address.street}</Descriptions.Item>
        <Descriptions.Item label={t("userData.suite")}>{user.address.suite}</Descriptions.Item>
        <Descriptions.Item label={t("userData.zipcode")}>{user.address.zipcode}</Descriptions.Item>
        <Descriptions.Item label={t("userData.lat")}>{user.address.geo.lat}</Descriptions.Item>
        <Descriptions.Item label={t("userData.lng")}>{user.address.geo.lng}</Descriptions.Item>
      </Descriptions>
      {children}
    </Card>
  );
};

export default UserCard;
