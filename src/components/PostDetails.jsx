import {
  collection,
  deleteDoc,
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
import { isMessageDirty } from "profanity-hindi";

const PostDetails = () => {
  const { articles } = useContext(MediumContext);
  const { authData } = useContext(AuthContext);

  const articleId = useParams();

  const [comments, setComments] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };

  const listenArticle = (articleTitle, articleSubTitle, articleContent) => {
    return new Promise((resolve, reject) => {
      const speechInstanceTitle = new SpeechSynthesisUtterance(
        `${articleTitle}${". "}${articleSubTitle}${". "}${articleContent.map(
          (content) => `${content.contentText}${". "}`
        )}`
      );
      speechInstanceTitle.pitch = 1.5;
      speechInstanceTitle.rate = 0.8;
      window.speechSynthesis.speak(speechInstanceTitle);
      setIsListening(true);
      speechInstanceTitle.onend = resolve;
    });
  };

  const stopListening = () => {
    window.speechSynthesis.cancel();
    setIsListening(false);
  };

  const pauseListening = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const resumeListening = () => {
    window.speechSynthesis.resume();
    setIsPaused(false);
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
    await onSnapshot(
      query(
        collection(db, `articles/${articleId.id}/comments`),
        orderBy("date", "desc")
      ),
      (snapshot) => {
        setComments(
          snapshot.docs.map((doc) => {
            return { id: doc.id, commentsArray: doc.data() };
          })
        );
        // console.log(snapshot.docs.map((doc) => doc.data()));
      }
    );
  };

  const newComment = doc(collection(db, `articles/${articleId.id}/comments`));

  const handleCommentSubmit = async (values, resetForm) => {
    // console.log(values);
    const isDirty = isMessageDirty(values.comment);
    console.log(isDirty);
    if (isDirty) {
      toast.warning("Abusive words not allowed", toastConfig);
    } else {
      await setDoc(newComment, {
        ...values,
        image: authData.isAnonymous ? "" : authData.photoURL,
        name: authData.isAnonymous
          ? `Anonymous${authData.uid.slice(0, 4)}`
          : authData.displayName,
        date: serverTimestamp(),
      });
      toast.success("Commented", toastConfig);
      resetForm();
    }
  };

  const deleteComment = async (commentId) => {
    // console.log(commentId);
    await deleteDoc(doc(db, `articles/${articleId.id}/comments/${commentId}`));
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
                {!isListening && (
                  <button
                    onClick={() => {
                      listenArticle(
                        filterArticle[0]?.data.title,
                        filterArticle[0]?.data.sub_title,
                        filterArticle[0]?.data.content
                      ).then(() => {
                        setIsListening(false);
                      });
                    }}
                  >
                    listen
                  </button>
                )}
                {isListening && (
                  <div className="flex items-center space-x-4">
                    {!isPaused && (
                      <button
                        onClick={() => {
                          pauseListening();
                        }}
                      >
                        Pause
                      </button>
                    )}
                    {isPaused && (
                      <button
                        onClick={() => {
                          resumeListening();
                        }}
                      >
                        Resume
                      </button>
                    )}
                    <button
                      onClick={() => {
                        stopListening();
                      }}
                    >
                      Stop
                    </button>
                  </div>
                )}
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
          <div className="space-y-5">
            {filterArticle[0]?.data.content &&
              filterArticle[0]?.data.content.map((dataContent) => {
                return (
                  <p
                    key={Math.random()}
                    className={`text-base leading-8 ${dataContent.style} ${
                      dataContent.style === "italic" &&
                      "border-l-2 border-gray-400 pl-4"
                    }`}
                  >
                    {dataContent.contentText}
                  </p>
                );
              })}
          </div>
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
                    className="flex justify-between items-start space-x-3 mt-5"
                  >
                    <div className="flex items-start space-x-3">
                      {comment.commentsArray.image !== "" && (
                        <figure className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex justify-center items-center">
                          <img src={comment.commentsArray.image} alt="" />
                        </figure>
                      )}
                      {comment.commentsArray.image === "" && (
                        <p className="w-6 h-6 rounded-full overflow-hidden bg-gray-300 flex justify-center items-center">
                          A
                        </p>
                      )}
                      <div>
                        <h6 className="font-semibold">
                          {comment.commentsArray.name}
                        </h6>
                        <p>{comment.commentsArray.comment}</p>
                      </div>
                    </div>
                    {authData !== null &&
                      authData.email ===
                        filterArticle[0]?.data.author_email && (
                        <button
                          onClick={() => {
                            deleteComment(comment.id);
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-4 sm:w-5 text-red-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      )}
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
