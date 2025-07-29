import React from "react";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { onAuthStateChanged } from "firebase/auth";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector(state => state.user); // Get user from Redux
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        const { uid, email, username } = user;
        dispatch(addUser({ uid, email, username }));
        navigate("/browse");

        // ...
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth).then(() => {}).catch(error => {
      // An error happened.
    });
  };
  return (
    <div className="absolute top-0 left-0 w-full px-4 py-4 bg-gradient-to-b from-black z-10 flex items-center">
      <img
        className="w-24 h-auto"
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production_2025-07-14/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
        alt="NetflixLogo"
      />
      <div className="flex-1" />
      {user &&
        <button
          onClick={handleSignOut}
          className="text-white bg-red-600 px-4 py-2 rounded hover:bg-red-700 transition duration-300 absolute top-4 right-4"
        >
          Sign Out
        </button>}
    </div>
  );
};

export default Header;
