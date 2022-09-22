import { useContext, useEffect } from "react";
// import { useParams } from "react-router-dom";
import { AuthContext, MediumContext } from "../context/Context";
import Post from "./Post";

const UserProfile = () => {
  const { authData } = useContext(AuthContext);
  const { articles } = useContext(MediumContext);

  //   const username = useParams();

  const myArticles =
    articles &&
    articles.filter((article) => article.data.author === authData?.displayName);

  // console.log(myArticles);

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {};
  }, []);

  return (
    <div className="w-full max-w-[45rem] mx-auto px-6 py-6 mt-16">
      <div className="flex flex-col items-center my-10">
        <figure className="border-4 border-gray-300 inline-block rounded-full overflow-hidden w-[104px]">
          <img
            src={
              authData?.isAnonymous
                ? "/images/incognito_logo.png"
                : authData?.photoURL
            }
            alt=""
          />
        </figure>
        <p className="text-3xl font-semibold mt-3">
          {authData?.isAnonymous
            ? `Anonymous${authData?.uid.slice(0, 4)}`
            : authData?.displayName}
        </p>
        <p className="text-lg text-gray-500 font-semibold mt-3">
          {!authData?.isAnonymous && authData?.email}
        </p>
      </div>
      {!authData?.isAnonymous && (
        <div>
          <p className="text-2xl font-semibold mt-3 border-b border-black inline-block mb-8">
            Your Articles
          </p>
          {myArticles.length !== 0 ? (
            myArticles.map((article) => {
              return (
                <Post key={Math.random()} id={article.id} {...article.data} />
              );
            })
          ) : (
            <p className="text-2xl font-semibold">
              You have not posted any article Yet...
            </p>
          )}
        </div>
      )}
      {authData?.isAnonymous && (
        <>
          <p className="text-2xl font-semibold">
            Being an anonymous user you cannot post anything.
          </p>
          <p className="text-2xl font-semibold mt-3">
            To post and see your article, please login with other options...
          </p>
        </>
      )}
    </div>
  );
};
export default UserProfile;
