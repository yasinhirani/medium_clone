import * as Yup from "yup";

const CommentValidation = Yup.object({
  comment: Yup.string().required("Comment is required"),
});

export default CommentValidation;
