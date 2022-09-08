import { Formik, Field, Form } from "formik";
import { useContext, useEffect } from "react";
import { AuthContext } from "../context/Context";
import WriteArticleValidation from "../validations/writeArticle.validation";
import { doc, collection, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../Firebase";
// import { ref, uploadBytes } from "firebase/storage";
const WriteArticle = () => {
  const { authData } = useContext(AuthContext);

  // const [uploadedImageUrl, setUploadedImageUrl] = useState("");

  const initialValues = {
    title: "",
    sub_title: "",
    content: "",
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
    console.log(values);
    resetForm();
    console.log("Article posted");
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  return (
    <div className="w-full max-w-[40rem] mx-auto px-6 py-10 h-full mt-20">
      <h2 className="font-semibold text-xl mb-10 text-center underline">
        Lets get Started writing an article
      </h2>
      <div>
        <Formik
          initialValues={initialValues}
          validationSchema={WriteArticleValidation}
          onSubmit={(values, { resetForm }) => {
            console.log(values);
            postArticle(values, resetForm);
          }}
        >
          {({ errors }) => {
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
                  <Field
                    className="border-2 border-gray-400 focus:outline-none px-2 py-1 rounded-md"
                    as="textarea"
                    rows={5}
                    name="content"
                    id="content"
                  />
                  <p className="text-sm text-red-600 font-semibold">
                    {errors.content}
                  </p>
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
    </div>
  );
};
export default WriteArticle;
