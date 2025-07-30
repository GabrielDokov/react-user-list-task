import React, { Dispatch, SetStateAction } from "react";
import { Formik, FormikHelpers } from "formik";
import { Row, Col, Input, Form, Modal, Button, notification } from "antd";
import { UserData } from "../../types/UserData";
import { useAppDispatch } from "../../store";
import { updateUser } from "../../features/slices/userInfoSlice";
import { validationSchema } from "./formConfig";

type Props = {
  user: UserData;
  isFormOpen: boolean;
  setIsFormOpen: Dispatch<SetStateAction<boolean>>;
};

const EditUserForm = ({ user, isFormOpen, setIsFormOpen }: Props) => {
  const dispatch = useAppDispatch();
  const [notificationInstance, contextHolder] = notification.useNotification();

  const handleEditUser = async (values: UserData, { resetForm }: FormikHelpers<UserData>) => {
    dispatch(updateUser(values));
    notificationInstance.success({ message: "Updated successfully" });
    resetForm();
    setIsFormOpen(false);
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
            setIsFormOpen(false);
          }}
          footer={
            <>
              <Button
                onClick={() => {
                  handleReset();
                  setIsFormOpen(false);
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
          {contextHolder}
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
