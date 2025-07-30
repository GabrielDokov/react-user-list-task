import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
  email: Yup.string().email().required(),
  address: Yup.object().shape({
    street: Yup.string().required(),
    suite: Yup.string().required(),
    city: Yup.string().required(),
    zipcode: Yup.string().notRequired(),
  }),
  phone: Yup.string().notRequired(),
  website: Yup.string().notRequired(),
});
