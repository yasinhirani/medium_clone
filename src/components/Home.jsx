import { useEffect, useState } from "react";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { MediumContext } from "../context/Context";
import Banner from "./Banner";
import Post from "./Post";

const Home = () => {
  const { articles, articlesLoading } = useContext(MediumContext);
  const [allArticles, setAllArticles] = useState({});
  const [categoryList, setCategoryList] = useState([]);
  const [filterText, setFilterText] = useState("");
  // console.log(articles);
  const articleRef = useRef(null);
  const goToArticle = () => {
    articleRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleFilter = (category) => {
    setFilterText(category);
    const filteredArticles =
      articles &&
      articles.filter((article) => article.data.category === category);
    setAllArticles(filteredArticles);
  };

  const handleClearFilter = () => {
    setFilterText("");
    setAllArticles(articles);
  };

  useEffect(() => {
    const list = [];
    articles && articles.map((data) => list.push(data.data.category));
    setCategoryList([...new Set(list)]);
    setAllArticles(articles);
  }, [articles]);
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
        <div className="flex flex-col-reverse lg:flex-row items-start lg:space-x-10">
          <div>
            {articles &&
              !articlesLoading &&
              allArticles.length > 0 &&
              allArticles.map((article) => (
                <Post key={Math.random()} id={article.id} {...article.data} />
              ))}
          </div>
          <div className="mb-8 lg:mb-0">
            {categoryList && categoryList.length > 0 && (
              <h5 className="font-semibold text-xl mb-4">Filter:-</h5>
            )}
            <div className="flex items-center space-x-5">
              {categoryList &&
                categoryList.length > 0 &&
                categoryList.map((category) => {
                  return (
                    <button
                      key={Math.random()}
                      className={`${
                        filterText === category
                          ? "bg-gray-400 text-gray-800"
                          : "bg-gray-200 text-gray-600"
                      } text-xs font-semibold px-4 py-1.5 rounded-full`}
                      onClick={() => {
                        handleFilter(category);
                      }}
                    >
                      <p>{category}</p>
                    </button>
                  );
                })}
            </div>
            {filterText !== "" && (
              <button
                className="mt-4 bg-black bg-opacity-90 px-3 py-1 text-xs text-white rounded-xl"
                onClick={() => {
                  handleClearFilter();
                }}
              >
                clear filter
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
