import * as Yup from "yup";

const WriteArticleValidation = Yup.object({
  title: Yup.string().required("Title is required"),
  sub_title: Yup.string().required("Sub Title is required"),
  content: Yup.string().required("Content is required"),
  category: Yup.string().required("Category is required"),
});

export default WriteArticleValidation;
