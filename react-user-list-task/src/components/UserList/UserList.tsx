import { useAppDispatch, useAppSelector } from "../../store";
import { Collapse, Typography, Button, Spin, Flex } from "antd";
import EditUserForm from "../EditUserForm/EditUserForm";
import { useEffect, useState } from "react";
import { fetchUsersThunk } from "../../features/thunks/fetchUsersThunk";
import { useNavigate } from "react-router";
import { UserData } from "../../types/UserData";
import classes from "./UserList.module.scss";
import UserCard from "../UserCard/UserCard";

const UserList = () => {
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const { users, isLoading } = useAppSelector((state) => state.userInfo);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchUsersThunk());
  }, [dispatch]);

  return (
    <>
      {editingUser && (
        <EditUserForm user={editingUser} isFormOpen={true} onClose={() => setEditingUser(null)} />
      )}
      {isLoading ? (
        <Spin fullscreen spinning={isLoading} />
      ) : (
        <>
          <Typography.Title className={classes.title}>{"Users"}</Typography.Title>
          <Collapse
            style={{ width: 800 }}
            accordion
            items={users.map((user) => ({
              key: user.id,
              label: user.name,
              children: (
                <UserCard user={user}>
                  <Flex className={classes.buttonsContainer}>
                    <Button type="primary" onClick={() => setEditingUser(user)}>
                      Edit
                    </Button>
                    <Button type="primary" onClick={() => navigate(`/posts/${user.id}`)}>
                      See Post
                    </Button>
                  </Flex>
                </UserCard>
              ),
            }))}
          />
        </>
      )}
    </>
  );
};

export default UserList;
