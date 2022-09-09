import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { Field, Form, Formik } from "formik";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, MediumContext } from "../context/Context";
import { db } from "../Firebase";
import CommentValidation from "../validations/Comment.Validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PostDetails = () => {
  const { articles } = useContext(MediumContext);
  const { authData } = useContext(AuthContext);

  const articleId = useParams();

  const [comments, setComments] = useState([]);

  const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };

  const listenArticle = (articleTitle, articleSubTitle) => {
    const speechInstanceTitle = new SpeechSynthesisUtterance(
      `${articleTitle}${" "}${articleSubTitle}`
    );
    speechInstanceTitle.pitch = 1;
    speechInstanceTitle.rate = 0.8;
    window.speechSynthesis.speak(speechInstanceTitle);
  };

  const filterArticle =
    articles && articles.filter((article) => articleId.id === article.id);

  // console.log(filterArticle);

  const newDate =
    filterArticle[0] &&
    new Date(filterArticle[0]?.data.date.seconds * 1000).toLocaleString(
      "en-US",
      {
        day: "numeric",
        month: "short",
      }
    );

  const getComments = async () => {
    // console.log(articleId.id);
    onSnapshot(
      query(
        collection(db, `articles/${articleId.id}/comments`),
        orderBy("date", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs.map((doc) => doc.data()));
        // console.log(snapshot.docs.map((doc) => doc.data()));
      }
    );
  };

  const newComment = doc(collection(db, `articles/${articleId.id}/comments`));

  const handleCommentSubmit = async (values, resetForm) => {
    // console.log(values);
    await setDoc(newComment, {
      ...values,
      image: authData.photoURL,
      name: authData.displayName,
      date: serverTimestamp(),
    });
    toast.success("Commented", toastConfig);
    resetForm();
  };

  useEffect(() => {
    getComments();
    window.scrollTo(0, 0);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {filterArticle.length > 0 ? (
        <div className="w-full max-w-[50rem] mx-auto px-6 py-10 mt-20">
          <div className="flex space-x-4 items-center w-full">
            <figure className="w-12 h-12 rounded-full overflow-hidden">
              <img src={filterArticle[0]?.data.author_image} alt="" />
            </figure>
            <div className="flex-grow">
              <p className="text-xl font-medium">
                {filterArticle[0]?.data.author}
              </p>
              <div className="flex justify-between items-center mt-1">
                <div className="flex items-center space-x-3">
                  <p className="text-sm text-gray-500">{newDate}</p>
                  <div className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-0.5 rounded-full">
                    <p>{filterArticle[0]?.data.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    listenArticle(
                      filterArticle[0]?.data.title,
                      filterArticle[0]?.data.sub_title
                    );
                  }}
                >
                  listen
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <h4 className="text-2xl sm:text-3xl font-serif capitalize text-gray-700">
              {filterArticle[0]?.data.title}
            </h4>
            <p className="text-gray-500 text-lg sm:text-xl mt-2">
              {filterArticle[0]?.data.sub_title}
            </p>
          </div>
          <figure className="w-full max-w-[50rem] my-8">
            <img
              className="w-full h-full"
              src={filterArticle[0]?.data.post_image}
              alt=""
              loading="lazy"
            />
          </figure>
          <p className="text-lg leading-8">{filterArticle[0]?.data.content}</p>
          <div className="mt-5">
            <h4 className="text-2xl font-semibold mb-5">Comments</h4>
            {authData !== null && (
              <Formik
                initialValues={{ comment: "" }}
                validationSchema={CommentValidation}
                onSubmit={(values, { resetForm }) => {
                  handleCommentSubmit(values, resetForm);
                }}
              >
                {({ errors }) => {
                  return (
                    <Form className="mb-5" autoComplete="off">
                      <div className="flex items-center space-x-3">
                        <Field
                          className="border-b-2 border-gray-400 focus:outline-none px-2 pb-2 w-full"
                          type="text"
                          name="comment"
                          id=""
                          placeholder="Comment"
                        />
                        <button
                          className="bg-black text-white rounded-3xl text-lg font-semibold px-6 py-2 bg-opacity-90 hover:bg-opacity-100"
                          type="submit"
                        >
                          Post
                        </button>
                      </div>
                      <p className="text-sm text-red-600 font-semibold">
                        {errors.comment}
                      </p>
                    </Form>
                  );
                }}
              </Formik>
            )}
            {comments.length === 0 && (
              <p className="font-semibold text-2xl">No comments yet...</p>
            )}
            {comments &&
              comments.map((comment) => {
                return (
                  <div
                    key={Math.random()}
                    className="flex items-start space-x-3 mt-5"
                  >
                    <figure className="w-6 h-6 rounded-full overflow-hidden">
                      <img src={comment.image} alt="" />
                    </figure>
                    <div>
                      <h6 className="font-semibold">{comment.name}</h6>
                      <p>{comment.comment}</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div className="w-full max-w-[50rem] mx-auto px-6 py-10 mt-20">
          <p>Loading...</p>
        </div>
      )}
    </>
  );
};
export default PostDetails;
