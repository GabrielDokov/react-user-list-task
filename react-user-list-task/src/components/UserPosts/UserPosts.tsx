import { Typography } from "antd";
import { useParams } from "react-router";

const UserPosts = () => {
  const { userId } = useParams();

  return (
    <>
      <Typography.Title>Posts</Typography.Title>
      <Typography.Title>{userId}</Typography.Title>
    </>
  );
};

export default UserPosts;
