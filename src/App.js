import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const Home = lazy(() => import("./components/Home"));
  const PostDetails = lazy(() => import("./components/PostDetails"));
  const WriteArticle = lazy(() => import("./components/WriteArticle"));
  const UserProfile = lazy(() => import("./components/UserProfile"));
  return (
    <div className="flex flex-col w-full h-full">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/article/:id" element={<PostDetails />} />
          <Route
            path="/writeArticle"
            element={<ProtectedRoute Component={WriteArticle} />}
          />
          <Route
            path="/profile/:name"
            element={<ProtectedRoute Component={UserProfile} />}
          />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
