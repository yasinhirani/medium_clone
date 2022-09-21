import { Formik, Field, Form, FieldArray } from "formik";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Context";
import WriteArticleValidation from "../validations/writeArticle.validation";
import { doc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import { useState } from "react";
// import { ref, uploadBytes } from "firebase/storage";
const WriteArticle = () => {
  const { authData } = useContext(AuthContext);

  const [selectedStyle, setSelectedStyle] = useState([]);

  const buttonRef = useRef(null);

  // const [postedArticle, setPostedArticle] = useState(false);

  const toastConfig = {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  };

  // const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const initialValues = {
    title: "",
    sub_title: "",
    content: [{ style: "", contentText: "" }],
    post_image: "",
    category: "",
  };

  // const handelImageUpload = (e) => {
  //   const imageUrl = URL.createObjectURL(e.target.files[0]);
  //   setUploadedImageUrl(imageUrl);
  // };

  const postArticle = async (values, resetForm) => {
    // const storageRef = ref(storage, `${initialValues.title}.jpg`);
    // uploadBytes(storageRef, uploadedImageUrl).then((snapshot) => {
    //   console.log("uploaded");
    // });
    const newArticle = doc(collection(db, "articles"));
    await setDoc(newArticle, {
      ...values,
      date: serverTimestamp(),
      author: authData?.displayName,
      author_image: authData?.photoURL,
    });
    // console.log(values);
    resetForm();
    setSelectedStyle([]);
    // setPostedArticle(true);
    toast.success("Posted Successfully", toastConfig);
    // console.log("Article posted");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  return (
    <div className="w-full max-w-[40rem] mx-auto px-6 py-10 mt-20">
      <h2 className="font-semibold text-xl mb-10 text-center underline">
        Lets get Started writing an article
      </h2>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={WriteArticleValidation}
          validateOnChange={false}
          onSubmit={(values, { resetForm }) => {
            // console.log(values);
            postArticle(values, resetForm);
          }}
        >
          {({ errors, values, setFieldValue }) => {
            return (
              <Form autoComplete="off">
                <div className="flex flex-col space-y-1 relative">
                  <label className="font-semibold text-base" htmlFor="title">
                    Title
                  </label>
                  <Field
                    className="border-2 border-gray-400 focus:outline-none px-2 py-1 rounded-md"
                    type="text"
                    name="title"
                    id="title"
                  />
                  <p className="text-sm text-red-600 font-semibold">
                    {errors.title}
                  </p>
                </div>
                <div className="flex flex-col space-y-1 relative mt-6">
                  <label
                    className="font-semibold text-base"
                    htmlFor="sub_title"
                  >
                    Sub Title
                  </label>
                  <Field
                    className="border-2 border-gray-400 focus:outline-none px-2 py-1 rounded-md"
                    type="text"
                    name="sub_title"
                    id="sub_title"
                  />
                  <p className="text-sm text-red-600 font-semibold">
                    {errors.sub_title}
                  </p>
                </div>
                <div className="flex flex-col space-y-1 relative mt-6">
                  <label className="font-semibold text-base" htmlFor="category">
                    Category
                  </label>
                  <Field
                    className="border-2 border-gray-400 focus:outline-none px-2 py-1 rounded-md"
                    type="text"
                    name="category"
                    id="category"
                  />
                  <p className="text-sm text-red-600 font-semibold">
                    {errors.category}
                  </p>
                </div>
                <div className="flex flex-col space-y-1 relative mt-6">
                  <label className="font-semibold text-base" htmlFor="content">
                    Content
                  </label>
                  <FieldArray name="content">
                    {({ push, remove }) => {
                      return (
                        <div className="flex flex-col space-y-0">
                          {values.content.length > 0 &&
                            values.content.map((contentField, index) => (
                              <div key={index} className="flex flex-col">
                                <button
                                  className={`${
                                    index === 0 && "hidden"
                                  } text-3xl mb-2 w-20 text-right self-end`}
                                  onClick={() => {
                                    remove(index);
                                  }}
                                >
                                  -
                                </button>
                                <div className="flex justify-between items-start space-x-3">
                                  <div className="flex flex-col flex-grow">
                                    <Field
                                      className="border-2 border-gray-400 focus:outline-none px-2 py-1 rounded-md w-full"
                                      as="textarea"
                                      rows={4}
                                      name={`content[${index}].contentText`}
                                      id={`content[${index}]`}
                                    />
                                    <p className="text-sm text-red-600 font-semibold">
                                      {errors.content &&
                                        errors.content[index]?.contentText}
                                    </p>
                                  </div>
                                  <div className="flex flex-col space-y-2">
                                    <button
                                      type="button"
                                      className={`italic text-lg px-3 py-0.5 rounded-md ${
                                        selectedStyle[index] === "italic" &&
                                        "bg-black bg-opacity-90 text-white"
                                      }`}
                                      onClick={() => {
                                        setFieldValue(
                                          `content[${index}.style]`,
                                          "italic"
                                        );
                                        setSelectedStyle((prev) => {
                                          return [...prev, "italic"];
                                        });
                                      }}
                                    >
                                      i
                                    </button>
                                    <button
                                      type="button"
                                      className={`font-bold text-lg px-3 py-0.5 rounded-md ${
                                        selectedStyle[index] === "bold" &&
                                        "bg-black bg-opacity-90 text-white"
                                      }`}
                                      onClick={() => {
                                        setFieldValue(
                                          `content[${index}.style]`,
                                          "font-bold"
                                        );
                                        setSelectedStyle((prev) => {
                                          return [...prev, "bold"];
                                        });
                                      }}
                                    >
                                      B
                                    </button>
                                    <button
                                      type="button"
                                      className={`underline text-lg px-3 py-0.5 rounded-md ${
                                        selectedStyle[index] === "underline" &&
                                        "bg-black bg-opacity-90 text-white"
                                      }`}
                                      onClick={() => {
                                        setFieldValue(
                                          `content[${index}.style]`,
                                          "underline"
                                        );
                                        setSelectedStyle((prev) => {
                                          return [...prev, "underline"];
                                        });
                                      }}
                                    >
                                      U
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          <button
                            type="button"
                            ref={buttonRef}
                            onClick={() => {
                              push("");
                            }}
                          />
                        </div>
                      );
                    }}
                  </FieldArray>
                  <button
                    type="button"
                    className="w-40 text-left"
                    onClick={() => {
                      buttonRef.current && buttonRef.current.click();
                    }}
                  >
                    + Add more content
                  </button>
                </div>
                <div className="flex flex-col space-y-1 relative mt-6">
                  <label
                    className="font-semibold text-base"
                    htmlFor="image_url"
                  >
                    Image URL
                  </label>
                  <Field
                    className="border-2 border-gray-400 focus:outline-none px-2 py-1 rounded-md"
                    name="post_image"
                    id="post_image"
                  />
                </div>
                {/* <input
                  type="file"
                  name="post_image"
                  onChange={(e) => {
                    handelImageUpload(e);
                  }}
                  id=""
                />
                {uploadedImageUrl && (
                  <figure className="post-image">
                    <img
                      className="w-full h-full"
                      src={uploadedImageUrl}
                      alt=""
                    />
                  </figure>
                )} */}
                <button
                  className="bg-black text-white rounded-3xl text-xl font-semibold w-full px-8 py-2 mt-10 bg-opacity-90 hover:bg-opacity-100"
                  type="submit"
                >
                  Publish
                </button>
              </Form>
            );
          }}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  );
};
export default WriteArticle;
