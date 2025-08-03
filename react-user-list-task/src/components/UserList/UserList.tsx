import { useAppSelector } from "../../store";
import { Collapse, Typography, Button, Spin, Flex } from "antd";
import EditUserForm from "../EditUserForm/EditUserForm";
import { useState } from "react";
import { useNavigate } from "react-router";
import { UserData } from "../../types/UserData";
import classes from "./UserList.module.scss";
import UserCard from "../UserCard/UserCard";
import { useTranslation } from "react-i18next";

const UserList = () => {
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const { users, isLoading } = useAppSelector((state) => state.userInfo);
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      {editingUser && (
        <EditUserForm user={editingUser} isFormOpen={true} onClose={() => setEditingUser(null)} />
      )}
      {isLoading ? (
        <Spin fullscreen spinning={isLoading} />
      ) : (
        <>
          <Typography.Title className={classes.title}>{t("titles.users")}</Typography.Title>
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
                      {t("buttons.edit")}
                    </Button>
                    <Button type="primary" onClick={() => navigate(`/posts/${user.id}`)}>
                      {t("buttons.seePosts")}
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
