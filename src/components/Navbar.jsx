import { Menu, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/Context";
import StarterModal from "./StarterModal";

const Navbar = () => {
  const location = useLocation();

  const [isStarterModalOpen, setIsStarterModalOpen] = useState(false);

  // Auth Context
  const { authData, logOut, loading } = useContext(AuthContext);

  const username = authData?.displayName;

  const closeModal = (close) => {
    setIsStarterModalOpen(close);
  };

  return (
    <>
      <nav
        className={`w-full ${
          location.pathname.includes("article") ||
          location.pathname.includes("writeArticle") ||
          location.pathname.includes("profile")
            ? "bg-white"
            : "bg-[#ffc017]"
        } h-20 border-b border-black fixed top-0 flex items-center z-10`}
      >
        <div className="w-full max-w-[80rem] mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/">
            <figure className="w-44 flex justify-center items-center">
              <img
                className="w-full"
                src="/images/medium_logo.png"
                alt="medium"
              />
            </figure>
          </Link>
          {authData === null ? (
            <button
              className="bg-black text-white rounded-3xl px-4 py-1.5 cursor-pointer"
              onClick={() => {
                setIsStarterModalOpen(true);
              }}
            >
              Get started
            </button>
          ) : (
            <>
              {!loading ? (
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="flex w-full justify-center items-center rounded-md text-sm font-medium text-white focus:outline-none">
                      {!authData.isAnonymous && (
                        <figure className="w-8 h-8 rounded-full overflow-hidden">
                          <img src={authData?.photoURL} alt="" />
                        </figure>
                      )}
                      {authData.isAnonymous && (
                        <span className="text-black">{`Anony${authData?.uid.slice(
                          0,
                          4
                        )}`}</span>
                      )}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-5 text-black ml-2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                        />
                      </svg>
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {!authData.isAnonymous && (
                        <Menu.Item>
                          <Link className="block" to="/writeArticle">
                            <button
                              className="w-full text-left px-3 py-2"
                              type="button"
                            >
                              Start Writing
                            </button>
                          </Link>
                        </Menu.Item>
                      )}
                      <Menu.Item>
                        <Link
                          to={`/profile/${
                            username && username.replace(" ", "").toLowerCase()
                          }`}
                          className="block"
                        >
                          <button
                            className="w-full text-left px-3 py-2"
                            type="button"
                          >
                            My Profile
                          </button>
                        </Link>
                      </Menu.Item>
                      <Menu.Item>
                        <button
                          className="w-full text-left px-3 py-2"
                          type="button"
                          onClick={logOut}
                        >
                          logout
                        </button>
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              ) : (
                <p>Please wait...</p>
              )}
            </>
          )}
        </div>
      </nav>
      <StarterModal isModalOpen={isStarterModalOpen} closeModal={closeModal} />
    </>
  );
};
export default Navbar;
