import * as Yup from "yup";

const WriteArticleValidation = Yup.object({
  title: Yup.string()
    .required("Title is required")
    .min(5, "Minimum 5 characters required")
    .matches(/^[a-zA-Z\s/]*$/g, "Invalid title")
    .trim(),
  sub_title: Yup.string()
    .required("Sub Title is required")
    .min(5, "Minimum 5 characters required")
    .matches(/^[a-zA-Z\s]*$/, "Invalid sub-title")
    .trim(),
  content: Yup.array().of(
    Yup.object().shape({
      style: Yup.string(),
      contentText: Yup.string()
        .required("Content is required")
        .min(5, "Minimum 5 characters required")
        .trim(),
    })
  ),
  category: Yup.string().required("Category is required").trim(),
});

export default WriteArticleValidation;
