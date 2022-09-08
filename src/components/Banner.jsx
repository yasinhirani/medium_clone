import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Context";

const Banner = ({ goToArticle }) => {
  const { authData } = useContext(AuthContext);
  return (
    <section className="w-full bg-[#ffc017] border-b border-black mt-20">
      <div className="w-full max-w-[80rem] mx-auto px-6 py-20 flex justify-between items-center">
        <div>
          <h2 className="text-4xl md:text-8xl font-serif">Stay curious.</h2>
          <p className="mt-5 text-2xl font-sans w-full sm:w-[35ch]">
            Discover stories, thinking, and expertise from writers on any topic.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-5 space-y-5 sm:space-y-0 mt-8">
            <button
              className="bg-black text-white rounded-3xl text-xl font-medium px-8 py-1.5 bg-opacity-90 hover:bg-opacity-100 w-52"
              onClick={goToArticle}
            >
              Start reading
            </button>
            {authData !== null && (
              <Link to="/writeArticle" className="w-52">
                <button className="bg-black text-white rounded-3xl text-xl font-medium px-8 py-1.5 bg-opacity-90 hover:bg-opacity-100 w-full">
                  Start writing
                </button>
              </Link>
            )}
          </div>
        </div>
        <figure className="w-[550px] hidden md:block">
          <img src="/images/medium_banner.png" alt="" />
        </figure>
      </div>
    </section>
  );
};
export default Banner;
