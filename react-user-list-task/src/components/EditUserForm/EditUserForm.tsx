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
      // validateOnChange={false}
      // validateOnBlur={true}
    >
      {({
        dirty,
        isValid,
        errors,
        handleReset,
        values,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
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
                <Form.Item
                  label="Username"
                  validateStatus={errors.username ? "error" : ""}
                  required
                >
                  <Input
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Email" validateStatus={errors.email ? "error" : ""} required>
                  <Input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={8}>
                <Form.Item
                  label="Street"
                  validateStatus={errors.address?.street ? "error" : ""}
                  required
                >
                  <Input
                    name="address.street"
                    value={values.address.street}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Suite"
                  validateStatus={errors.address?.suite ? "error" : ""}
                  required
                >
                  <Input
                    name="address.suite"
                    value={values.address.suite}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="City"
                  validateStatus={errors.address?.city ? "error" : ""}
                  required
                >
                  <Input
                    name="address.city"
                    value={values.address.city}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
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
                <Form.Item label="Zipcode" validateStatus={errors.address?.street ? "error" : ""}>
                  <Input
                    name="address.zipcode"
                    value={values.address.zipcode}
                    onChange={handleChange}
                    onBlur={handleBlur}
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
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Latitude"
                  validateStatus={errors.address?.geo?.lat ? "error" : ""}
                >
                  <Input
                    name="address.geo.lat"
                    value={values.address.geo.lat}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Longtitude"
                  validateStatus={errors.address?.geo?.lng ? "error" : ""}
                >
                  <Input
                    name="address.geo.lng"
                    value={values.address.geo.lng}
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

export default EditUserForm;
