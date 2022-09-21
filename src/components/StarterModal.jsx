import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import {
  getAuth,
  GoogleAuthProvider,
  signInAnonymously,
  signInWithRedirect,
} from "firebase/auth";
const StarterModal = ({ isModalOpen, closeModal }) => {
  // Google login
  const auth = getAuth();

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    // signInWithPopup(auth, provider)
    //   .then((result) => {
    //     closeModal(false);
    //     setAuthData(result.user);
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    signInWithRedirect(auth, provider);
  };

  const loginAnonymously = () => {
    signInAnonymously(auth).then((user) => {
      console.log(user);
      closeModal(false);
    });
  };

  return (
    <Transition appear show={isModalOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => closeModal(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-white bg-opacity-90" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all">
                <div className="mb-6 flex justify-end">
                  <button
                    onClick={() => closeModal(false)}
                    className="text-base"
                  >
                    X
                  </button>
                </div>
                <div className="flex flex-col items-center justify-center space-y-5">
                  <div>
                    <button
                      className="border border-gray-600 rounded-full p-3 flex items-center space-x-4"
                      onClick={loginWithGoogle}
                    >
                      <figure className="w-6">
                        <img src="/images/google_icon.png" alt="" />
                      </figure>
                      <span>Contiue With Google</span>
                    </button>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <button
                      className="border border-gray-600 rounded-full p-3 flex items-center space-x-4"
                      onClick={loginAnonymously}
                    >
                      <figure className="w-6">
                        <img src="/images/incognito_logo.png" alt="" />
                      </figure>
                      <span>Login Anonymously</span>
                    </button>
                    <p className="text-xs w-52">
                      You won't be able to post anything from anonymous account
                      and once logout you won't be able to access this account
                      again.
                    </p>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default StarterModal;
