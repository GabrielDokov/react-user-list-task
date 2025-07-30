import { Button, Divider, Flex, Modal, notification, Typography } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store";
import { fetchPostsByUserIdThunk } from "../../features/thunks/fetchPostsByUserIdThunk";
import { fetchUsersThunk } from "../../features/thunks/fetchUsersThunk";
import EditUserForm from "../EditUserForm/EditUserForm";
import { deletePostByIdThunk } from "../../features/thunks/deletePostByIdThunk";
import EditPostForm from "../EditPostForm/EditPostForm";
import { PostData } from "../../types/PostsData";

const UserPosts = () => {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { posts } = useAppSelector((state) => state.posts);
  const users = useAppSelector((state) => state.userInfo.users);
  const navigate = useNavigate();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePostId, setDeletePostId] = useState<number | null>(null);
  const [editingPost, setEditingPost] = useState<PostData | null>(null);
  const user = users.find((user) => user.id === Number(userId));
  const [notificationInstance, contextHolder] = notification.useNotification();

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
      notificationInstance.success({ message: "Post deleted successfully!" });
      setDeletePostId(null);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <div>
        {contextHolder}
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
        <Button onClick={() => navigate("/")}>← Back to Users</Button>
        <Typography.Title level={2}>Posts by {user?.name}</Typography.Title>
        <Flex vertical>
          <Typography.Text>Username: {user?.username}</Typography.Text>
          <Typography.Text>Email: {user?.email}</Typography.Text>
          <Typography.Text>Name: {user?.name}</Typography.Text>
        </Flex>
        <Button type="primary" onClick={() => setIsFormOpen(true)}>
          Edit
        </Button>
        {user && <EditUserForm user={user} isFormOpen={isFormOpen} setIsFormOpen={setIsFormOpen} />}
        <Divider />
        {editingPost && (
          <EditPostForm
            post={editingPost}
            isOpen={true}
            onClose={() => setEditingPost(null)}
            notificationApi={notificationInstance}
          />
        )}
        {posts.map((post) => (
          <Flex vertical key={post.id}>
            <Typography.Title level={4}>{post.title}</Typography.Title>
            <Typography.Paragraph>{post.body}</Typography.Paragraph>
            <Flex gap={12}>
              <Button onClick={() => setEditingPost(post)} type="primary">
                Edit
              </Button>
              <Button type="primary" onClick={() => showDeleteConfirm(post.id)} danger>
                Delete
              </Button>
            </Flex>
          </Flex>
        ))}
      </div>
    </>
  );
};

export default UserPosts;
