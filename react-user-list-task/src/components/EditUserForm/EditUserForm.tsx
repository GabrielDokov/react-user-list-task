import { Formik, FormikHelpers } from "formik";
import { Row, Col, Input, Form, Modal, Button } from "antd";
import { UserData } from "../../types/UserData";
import { useAppDispatch } from "../../store";
import { updateUser } from "../../features/slices/userInfoSlice";
import { validationSchema } from "./formConfig";
import { useContext } from "react";
import { NotificationContext } from "../../context/NotificationContextProvider";

type Props = {
  user: UserData;
  isFormOpen: boolean;
  onClose: () => void;
};

const EditUserForm = ({ user, isFormOpen, onClose }: Props) => {
  const dispatch = useAppDispatch();
  const { notification } = useContext(NotificationContext);

  const handleEditUser = async (values: UserData, { resetForm }: FormikHelpers<UserData>) => {
    dispatch(updateUser(values));
    notification.success({ message: "User updated successfully" });
    resetForm();
    onClose();
  };

  return (
    <Formik
      initialValues={user}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleEditUser}
    >
      {({ dirty, isValid, handleReset, values, handleChange, handleSubmit }) => (
        <Modal
          open={isFormOpen}
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
                Return
              </Button>
              <Button onClick={() => handleSubmit()} disabled={!dirty || !isValid} type="primary">
                Submit
              </Button>
            </>
          }
          title={"Edit User Information"}
        >
          <Form>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Username" required>
                  <Input name="username" value={values.username} onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" required>
                  <Input name="email" value={values.email} onChange={handleChange} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Name">
                  <Input name="name" value={values.name} onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="City">
                  <Input name="address.city" value={values.address.city} onChange={handleChange} />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item label="Street" required>
                  <Input
                    name="address.street"
                    value={values.address.street}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Suite" required>
                  <Input
                    name="address.suite"
                    value={values.address.suite}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Zipcode" required>
                  <Input
                    name="address.zipcode"
                    value={values.address.zipcode}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Phone">
                  <Input name="phone" value={values.phone} onChange={handleChange} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Website">
                  <Input name="website" value={values.website} onChange={handleChange} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      )}
    </Formik>
  );
};

export default EditUserForm;
