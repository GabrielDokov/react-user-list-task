import { Button, Card, Col, Divider, Empty, Flex, List, Modal, Typography } from "antd";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPostsByUserIdThunk } from "../../features/thunks/fetchPostsByUserIdThunk";
import { fetchUsersThunk } from "../../features/thunks/fetchUsersThunk";
import EditUserForm from "../EditUserForm/EditUserForm";
import { deletePostByIdThunk } from "../../features/thunks/deletePostByIdThunk";
import EditPostForm from "../EditPostForm/EditPostForm";
import { PostData } from "../../types/PostsData";
import classes from "./UserPost.module.scss";
import { NotificationContext } from "../../context/NotificationContextProvider";
import UserCard from "../UserCard/UserCard";
import { ArrowLeftOutlined } from "@ant-design/icons";

const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { posts, isLoading } = useAppSelector((state) => state.posts);
  const users = useAppSelector((state) => state.userInfo.users);
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const user = users.find((user) => user.id === Number(userId));
  const { notification } = useContext(NotificationContext);

  useEffect(() => {
    if (userId) {
      dispatch(fetchPostsByUserIdThunk(userId));
    }
    dispatch(fetchUsersThunk());
  }, [dispatch, userId]);

  const showDeleteConfirm = (postId: number) => {
    setIsDeleteModalOpen(true);
    setDeletePostId(postId);
  };

  const handleDeleteConfirm = async () => {
    if (deletePostId) {
      await dispatch(deletePostByIdThunk(deletePostId));
      notification.success({ message: "Post deleted successfully!" });
      setDeletePostId(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <Modal
        title={"Are you sure you want to delete this post?"}
        onCancel={() => setIsDeleteModalOpen(false)}
        open={isDeleteModalOpen}
        footer={
          <>
            <Button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletePostId(null);
              }}
            >
              Cancel
            </Button>
            <Button onClick={() => handleDeleteConfirm()} type="primary" danger>
              Delete
            </Button>
          </>
        }
      />
      <Button
        icon={<ArrowLeftOutlined />}
        className={classes.backButton}
        type="link"
        onClick={() => navigate("/")}
      >
        Back to Users
      </Button>

      <>
        <Col xs={12}>
          {user && (
            <UserCard
              extra={
                <Button type="primary" onClick={() => setIsFormOpen(true)}>
                  Edit
                </Button>
              }
              user={user}
              title={`Posts by ${user?.name}`}
            />
          )}
        </Col>

        {user && (
          <EditUserForm user={user} isFormOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
        )}
        <Divider />
        {editingPost && (
          <EditPostForm
            post={editingPost}
            isOpen={true}
            onClose={() => setEditingPost(null)}
            notificationApi={notification}
          />
        )}
        {posts.length === 0 && !isLoading ? (
          <Empty description={<Typography.Text>No posts</Typography.Text>} />
        ) : (
          <List
            grid={{ gutter: [24, 24], column: 4 }}
            loading={isLoading}
            dataSource={posts}
            renderItem={(post) => (
              <Col>
                <Card
                  title={post.title}
                  actions={[
                    <Flex align="center" justify="center" gap={24}>
                      <Button onClick={() => setEditingPost(post)} type="primary">
                        Edit
                      </Button>
                      <Button type="primary" onClick={() => showDeleteConfirm(post.id)} danger>
                        Delete
                      </Button>
                    </Flex>,
                  ]}
                >
                  <Col className={classes.cardMeteContainer}>
                    <Card.Meta description={post.body} />
                  </Col>
                </Card>
              </Col>
            )}
          />
        )}
      </>
    </>
  );
};

export default UserPosts;
