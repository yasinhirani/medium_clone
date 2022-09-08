import { useContext, useRef } from "react";
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
