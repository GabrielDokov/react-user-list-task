import { useAppDispatch, useAppSelector } from "../../store";
import { Collapse, Typography, Col, Button, Spin, Flex } from "antd";
import EditUserForm from "../EditUserForm/EditUserForm";
import { useEffect, useState } from "react";
import { fetchUsersThunk } from "../../features/thunks/fetchUsersThunk";
import { useNavigate } from "react-router";

const UserList = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { users, isLoading } = useAppSelector((state) => state.userInfoSlice);
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
              <>
                <Col>
                  <Typography.Text>{"Email: "}</Typography.Text>
                  <Typography.Text>{user.email}</Typography.Text>
                </Col>
                <Col>
                  <Typography.Text>{"Address: "}</Typography.Text>
                  <Typography.Text>{user.address.city}</Typography.Text>
                </Col>
                <Flex gap={12}>
                  <Button type="primary" onClick={() => setIsFormOpen(true)}>
                    Edit
                  </Button>
                  <Button type="primary" onClick={() => navigate(`/posts/${user.id}`)}>
                    See Post
                  </Button>
                  <EditUserForm user={user} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />
                </Flex>
              </>
            ),
          }))}
        />
      )}
    </>
  );
};

export default UserList;
