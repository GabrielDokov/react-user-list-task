import { useAppDispatch, useAppSelector } from "../../store";
import { Collapse, Typography, Button, Spin, Flex } from "antd";
import EditUserForm from "../EditUserForm/EditUserForm";
import { useEffect, useState } from "react";
import { fetchUsersThunk } from "../../features/thunks/fetchUsersThunk";
import { useNavigate } from "react-router";

const UserList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { users, isLoading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <>
      {isLoading ? (
        <Spin fullscreen spinning={isLoading} />
      ) : (
        <Collapse
          accordion
          items={users.map((user) => ({
            key: user.id,
            label: user.name,
            children: (
              <Flex gap={8} vertical>
                <Typography.Text>Name: {user?.name}</Typography.Text>
                <Typography.Text>Username: {user?.username}</Typography.Text>
                <Typography.Text>Email: {user?.email}</Typography.Text>
                <Typography.Text>Phone: {user?.phone}</Typography.Text>
                <Typography.Text>Website: {user?.website}</Typography.Text>
                <Typography.Text>City: {user?.address.city}</Typography.Text>
                <Typography.Text>Street: {user?.address.street}</Typography.Text>
                <Flex gap={12}>
                  <Button type="primary" onClick={() => setIsFormOpen(true)}>
                    Edit
                  </Button>
                  <Button type="primary" onClick={() => navigate(`/posts/${user.id}`)}>
                    See Post
                  </Button>
                  <EditUserForm user={user} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
                </Flex>
              </Flex>
            ),
          }))}
        />
      )}
    </>
  );
};

export default UserList;
