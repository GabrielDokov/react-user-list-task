import { Button, Col, Form, Input, Modal, Row } from "antd";
import { Formik, FormikHelpers } from "formik";
import { validationSchema } from "./formConfig";
import { PostData } from "../../types/PostsData";
import { useAppDispatch } from "../../store";
import { updatePostThunk } from "../../features/thunks/updatePostThunk";
import { NotificationInstance } from "antd/es/notification/interface";

type Props = {
  post: PostData;
  isOpen: boolean;
  onClose: () => void;
  notificationApi: NotificationInstance;
};

const EditPostForm = ({ post, isOpen, onClose, notificationApi }: Props) => {
  const dispatch = useAppDispatch();

  const handleEditPost = async (values: PostData, { resetForm }: FormikHelpers<PostData>) => {
    await dispatch(updatePostThunk(values));
    notificationApi.success({ message: "Post Updated Successfully" });
    resetForm();
    onClose();
  };

  return (
    <>
      <Formik
        initialValues={post}
        validationSchema={validationSchema}
        enableReinitialize
        onSubmit={handleEditPost}
      >
        {({ dirty, isValid, handleReset, values, handleChange, handleSubmit }) => (
          <Modal
            open={isOpen}
            width={700}
            onCancel={() => {
              handleReset();
              onClose();
            }}
            footer={
              <>
                <Button
                  onClick={() => {
                    handleReset();
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={() => handleSubmit()} disabled={!dirty || !isValid} type="primary">
                  Submit
                </Button>
              </>
            }
            title={"Edit User Post"}
          >
            <Form>
              <Row gutter={24}>
                <Col span={24}>
                  <Form.Item label="Title" required>
                    <Input name="title" value={values.title} onChange={handleChange} />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item label="Body" required>
                    <Input name="body" value={values.body} onChange={handleChange} />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default EditPostForm;
