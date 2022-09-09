import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { MediumContext } from "../context/Context";
import Banner from "./Banner";
import Post from "./Post";

const Home = () => {
  const { articles, articlesLoading } = useContext(MediumContext);
  // console.log(articles);
  const articleRef = useRef(null);
  const goToArticle = () => {
    articleRef.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <Banner goToArticle={goToArticle} />
      <div
        className="w-full max-w-[80rem] mx-auto px-6 py-10 flex flex-col space-y-2"
        ref={articleRef}
      >
        {articlesLoading && <p>Loading...</p>}
        {articles.length === 0 && !articlesLoading && (
          <div>
            <p className="font-semibold text-3xl">
              No one has posted any article yet...
            </p>
            <p className="font-semibold text-lg mt-4">
              Be the first one to post an article.
              <Link to="/writeArticle" className="underline ml-1">
                Start writing
              </Link>
            </p>
          </div>
        )}
        {articles &&
          !articlesLoading &&
          articles.map((article) => (
            <Post key={Math.random()} id={article.id} {...article.data} />
          ))}
      </div>
    </>
  );
};
export default Home;
