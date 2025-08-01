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
    <Formik
      initialValues={post}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleEditPost}
      validateOnChange={false}
      validateOnBlur={true}
    >
      {({
        dirty,
        isValid,
        errors,
        values,
        handleReset,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
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
                <Form.Item label="Title" validateStatus={errors.title ? "error" : ""} required>
                  <Input
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Body" validateStatus={errors.body ? "error" : ""} required>
                  <Input.TextArea
                    rows={3}
                    name="body"
                    value={values.body}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default EditPostForm;
