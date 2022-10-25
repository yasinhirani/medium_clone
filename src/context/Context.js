import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { db } from "../Firebase";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const MediumContext = createContext();
const AuthContext = createContext();

const MediumProvider = ({ children }) => {
  const [articles, setArticles] = useState([]);
  const [articlesLoading, setArticlesLoading] = useState(false);

  const getArticles = async () => {
    setArticlesLoading(true);
    // await onSnapshot(
    //   query(collection(db, "articles"), orderBy("date", "desc")),
    //   (snapShot) => {
    //     setArticlesLoading(false);
    //     setArticles(
    //       snapShot.docs.map((doc) => {
    //         return {
    //           id: doc.id,
    //           data: doc.data(),
    //         };
    //       })
    //     );
    //   }
    // );
    const articlesSnapshot = await getDocs(
      query(collection(db, "articles"), orderBy("date", "desc"))
    ).finally(() => setArticlesLoading(false));
    setArticles(
      articlesSnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          data: doc.data(),
        };
      })
    );
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <MediumContext.Provider value={{ articles, articlesLoading, getArticles }}>
      {children}
    </MediumContext.Provider>
  );
};

const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState([]);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("Logout successfull");
        setAuthData(null);
      })
      .catch((e) => {
        // console.log(e);
      });
  };

  const setUserData = async (email, displayName, isAnonymous) => {
    const userDoc = await getDoc(doc(db, `users/${email}`));
    if (userDoc.exists()) {
      return;
    } else if (isAnonymous) {
      return;
    } else {
      await setDoc(doc(db, `users/${email}`), {
        name: displayName,
        email: email,
        followers: 0,
        following: 0,
        followingList: [],
      });
    }
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (currentUser) => {
      setAuthData(currentUser);
      setLoading(false);
      if (currentUser) {
        setUserData(
          currentUser.email,
          currentUser.displayName,
          currentUser.isAnonymous
        );
      }
      // console.log(currentUser);
    });
    return () => {};
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, logOut, loading, setLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { MediumProvider, MediumContext, AuthContext, AuthProvider };
