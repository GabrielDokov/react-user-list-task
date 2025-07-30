import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  title: Yup.string().required(),
  body: Yup.string().required(),
});
