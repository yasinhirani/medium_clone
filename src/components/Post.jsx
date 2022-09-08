import { Link, useLocation } from "react-router-dom";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../Firebase";
const Post = ({
  id,
  author,
  author_image,
  title,
  sub_title,
  post_image,
  date,
  category,
}) => {
  // console.log(author, author_image, title, sub_title, post_image);
  const { seconds } = date;

  const newDate = new Date(seconds * 1000).toLocaleString("en-US", {
    day: "numeric",
    month: "short",
  });

  const location = useLocation();

  const deleteArticle = async (articleId) => {
    console.log(articleId);
    await deleteDoc(doc(db, "articles", articleId));
  };
  return (
    // <Link to={`/article/${id}`} className="w-full md:w-max">
    <div className="py-5 flex justify-between items-center space-x-5 sm:space-x-10 w-full md:w-max">
      <div>
        <div className="flex space-x-3 items-center">
          <figure className="w-6 h-6 rounded-full overflow-hidden">
            <img src={author_image} alt="" />
          </figure>
          <span className="font-medium text-sm">{author}</span>
        </div>
        <Link to={`/article/${id}`}>
          <h4 className="font-bold text-lg md:text-3xl text-gray-900 md:w-[25ch] line-clamp-2">
            {title}
          </h4>
        </Link>
        <p className="text-gray-600 text-base md:w-[50ch] hidden md:block">
          {sub_title}
        </p>
        <div className="flex justify-between items-center space-x-3 mt-3">
          <div className="flex items-center space-x-3">
            <p className="text-sm text-gray-500">{newDate}</p>
            <div className="bg-gray-200 text-gray-600 px-3 py-0.5 rounded-full">
              <p>{category}</p>
            </div>
          </div>
          {location.pathname.includes("profile") && (
            <div>
              <button
                onClick={() => {
                  deleteArticle(id);
                }}
                className="hidden sm:block"
              >
                delete
              </button>
              <button
                onClick={() => {
                  deleteArticle(id);
                }}
                className="block sm:hidden"
              >
                x
              </button>
            </div>
          )}
        </div>
      </div>
      <figure className="post-image">
        <img src={post_image} alt="" />
      </figure>
    </div>
  );
};
export default Post;
