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
    // console.log(articleId);
    await deleteDoc(doc(db, "articles", articleId));
  };
  return (
    // <Link to={`/article/${id}`} className="w-full md:w-max">
    <div className="py-5 flex justify-between items-center space-x-5 sm:space-x-10 w-full md:w-max">
      <div className="flex-grow">
        <div className="flex space-x-3 items-center">
          <figure className="w-6 h-6 rounded-full overflow-hidden">
            <img src={author_image} alt="" />
          </figure>
          <span className="font-medium text-sm">{author}</span>
        </div>
        <Link to={`/article/${id}`}>
          <h4 className="font-bold text-lg md:text-2xl leading-6 text-gray-900 md:w-[25ch] line-clamp-2 my-1">
            {title}
          </h4>
        </Link>
        <p className="text-gray-600 text-base md:w-[50ch] hidden md:block line-clamp-1">
          {sub_title}
        </p>
        <div className="flex justify-between items-center space-x-3 mt-3">
          <div className="flex items-center space-x-3 w-full">
            <p className="text-sm text-gray-500">{newDate}</p>
            <div className="bg-gray-200 text-gray-600 text-xs font-semibold px-3 py-0.5 rounded-full">
              <p>{category}</p>
            </div>
          </div>
          {location.pathname.includes("profile") && (
            <button
              onClick={() => {
                deleteArticle(id);
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
      </div>
      <figure className="post-image">
        <img className="w-full min-h-full" src={post_image} alt="" />
      </figure>
    </div>
  );
};
export default Post;
