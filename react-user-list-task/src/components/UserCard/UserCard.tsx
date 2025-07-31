import { Card, Descriptions } from "antd";
import { ReactNode } from "react";
import { UserData } from "../../types/UserData";

type Props = {
  user: UserData;
  extra?: ReactNode;
  title?: string;
  children?: ReactNode;
};

const UserCard = ({ user, children, extra, title }: Props) => {
  return (
    <Card title={title} extra={extra}>
      <Descriptions title="User Information" size="small">
        <Descriptions.Item label="Name">{user.name}</Descriptions.Item>
        <Descriptions.Item label="Username">{user.username}</Descriptions.Item>
        <Descriptions.Item label="Email">{user.email}</Descriptions.Item>
        <Descriptions.Item label="Phone">{user.phone}</Descriptions.Item>
        <Descriptions.Item label="Website">{user.website}</Descriptions.Item>
        <Descriptions.Item label="City">{user.address.city}</Descriptions.Item>
        <Descriptions.Item label="Street">{user.address.street}</Descriptions.Item>
        <Descriptions.Item label="Suite">{user.address.suite}</Descriptions.Item>
        <Descriptions.Item label="Zipcode">{user.address.zipcode}</Descriptions.Item>
        <Descriptions.Item label="Latitude">{user.address.geo.lat}</Descriptions.Item>
        <Descriptions.Item label="Longitude">{user.address.geo.lng}</Descriptions.Item>
      </Descriptions>
      {children}
    </Card>
  );
};

export default UserCard;
