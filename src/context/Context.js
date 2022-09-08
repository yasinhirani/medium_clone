import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
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
    await onSnapshot(
      query(collection(db, "articles"), orderBy("date", "desc")),
      (snapShot) => {
        setArticlesLoading(false);
        setArticles(
          snapShot.docs.map((doc) => {
            return {
              id: doc.id,
              data: doc.data(),
            };
          })
        );
      }
    );
  };

  useEffect(() => {
    getArticles();
  }, []);
  return (
    <MediumContext.Provider value={{ articles, articlesLoading }}>
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
        console.log("Logout successfull");
        setAuthData(null);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (currentUser) => {
      setAuthData(currentUser);
      setLoading(false);
      console.log(currentUser);
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
