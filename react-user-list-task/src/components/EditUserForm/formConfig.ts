import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  username: Yup.string().min(3).max(20).required(),
  email: Yup.string().email().max(50).required(),
  address: Yup.object().shape({
    street: Yup.string().min(3).max(50).required(),
    suite: Yup.string().min(3).max(50).required(),
    city: Yup.string().min(3).max(50).required(),
    zipcode: Yup.number().notRequired(),
    geo: Yup.object().shape({
      lat: Yup.number().notRequired(),
      lng: Yup.number().notRequired(),
    }),
  }),
  phone: Yup.string().notRequired(),
  website: Yup.string().notRequired(),
});
