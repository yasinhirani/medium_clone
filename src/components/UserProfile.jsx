import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { AuthContext, MediumContext } from "../context/Context";
import { db } from "../Firebase";
import Post from "./Post";

const UserProfile = () => {
  const { authData } = useContext(AuthContext);
  const { articles } = useContext(MediumContext);

  const [userData, setUserData] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filterArticle, setFilterArticle] = useState([]);

  const { name } = useParams();

  // const myArticles =
  //   articles &&
  //   articles.filter((article) => article.data.author_email === name);

  // console.log(myArticles);

  const getUserDetail = async () => {
    const userDoc = await getDoc(doc(db, `users/${name}`));
    setUserData(userDoc.data());
  };

  // Get following List
  const getFollowingList = async () => {
    if (authData !== null) {
      setIsLoading(true);
      const userDoc = await getDoc(doc(db, `users/${authData.email}`));
      if (userDoc.exists()) {
        const findFollowing = userDoc.data().followingList.includes(name);
        if (findFollowing) {
          setIsFollowing(true);
          setIsLoading(false);
        } else {
          setIsFollowing(false);
          setIsLoading(false);
        }
      }
    }
  };

  // Hanlde follow
  const handleFollow = async () => {
    setIsLoading(true);
    const articleOwner = await getDoc(doc(db, `users/${name}`));
    const userDoc = await getDoc(doc(db, `users/${authData.email}`));
    await updateDoc(doc(db, `users/${name}`), {
      followers: articleOwner.data().followers + 1,
    });
    await updateDoc(doc(db, `users/${authData.email}`), {
      following: userDoc.data().following + 1,
      followingList: [...userDoc.data().followingList, name],
    }).then(() => setIsLoading(false));
    getFollowingList();
    getUserDetail();
  };

  // Handle Unfollow
  const handleUnfollow = async () => {
    setIsLoading(true);
    const articleOwner = await getDoc(doc(db, `users/${name}`));
    const userDoc = await getDoc(doc(db, `users/${authData.email}`));
    await updateDoc(doc(db, `users/${name}`), {
      followers: articleOwner.data().followers - 1,
    });
    const updatedFollowingList = userDoc
      .data()
      .followingList.filter((list) => list !== name);
    await updateDoc(doc(db, `users/${authData.email}`), {
      following: userDoc.data().following - 1,
      followingList: updatedFollowingList,
    }).then(() => setIsLoading(false));
    getFollowingList();
    getUserDetail();
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setFilterArticle(
      articles &&
        articles.filter((article) => article.data.author_email === name)
    );
    getUserDetail();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articles]);

  useEffect(() => {
    name !== authData?.email && getFollowingList();
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="w-full max-w-[45rem] mx-auto px-6 py-6 mt-16">
      <div className="flex flex-col items-center my-10">
        <figure className="border-4 border-gray-300 inline-block rounded-full overflow-hidden w-[104px] h-[104px]">
          <img
            src={
              authData?.isAnonymous
                ? "/images/incognito_logo.png"
                : userData.profilePicture
            }
            alt=""
          />
        </figure>
        {authData && name !== authData.email && !authData.isAnonymous && (
          <div>
            {!isLoading && <div className="mt-5">
              {!isFollowing && (
                <button type="button" onClick={() => handleFollow()}>
                  Follow
                </button>
              )}
              {isFollowing && (
                <button type="button" onClick={() => handleUnfollow()}>
                  Unfollow
                </button>
              )}
            </div>}
            {isLoading && <div className="loader mt-5"></div>}
          </div>
        )}
        <p className="text-3xl font-semibold mt-3">
          {authData?.isAnonymous
            ? `Anonymous${authData?.uid.slice(0, 4)}`
            : userData.name}
        </p>
        <p className="text-lg text-gray-500 font-semibold mt-3">
          {!authData?.isAnonymous && userData.email}
        </p>
        <div className="flex justify-between items-center w-full sm:w-1/2 mt-5">
          <div className="flex items-center space-x-2">
            <p>Followers:</p>
            <span>{userData?.followers}</span>
          </div>
          <div className="flex items-center space-x-2">
            <p>Following:</p>
            <span>{userData?.following}</span>
          </div>
        </div>
      </div>
      {!authData?.isAnonymous && (
        <div>
          <p className="text-2xl font-semibold mt-3 border-b border-black inline-block mb-8">
            Your Articles
          </p>
          {filterArticle.length !== 0 ? (
            filterArticle.map((article) => {
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
