import React, { useRef } from "react";
import Header from "./Header";
import { useState } from "react";
import checkValidData from "../utils/Validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);

  console.log(email);
  console.log(password);

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);
    if (message) {
      return;
    }
    if (isSignup) {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(userCredential => {
          // Handle Sign up logic
          const user = userCredential.user;
          console.log("User signed up:", user);
          navigate("/browse");
          // ...
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    } else {
      //Handle Sign In Logic

      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(userCredential => {
          // Signed in
          const user = userCredential.user;
          console.log("User signed in:", user);
          navigate("/browse");
          // ...
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + " " + errorMessage);
        });
    }
  };

  const toggleSignupForm = () => {
    setIsSignup(!isSignup);
  };
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <img
        src="https://assets.nflxext.com/ffe/siteui/vlv3/a927b1ee-784d-494a-aa80-cf7a062d2523/web/IN-en-20250714-TRIFECTA-perspective_5acb7337-c372-45ec-ae12-ddb110e6ad78_large.jpg"
        alt="Login Background"
        className="h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60" />

      {/* Header */}
      <div>
        <Header />
      </div>

      {/* Login Form */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <form className="bg-black bg-opacity-75 p-8 rounded-md text-white w-[90%] max-w-md">
          <h2 className="text-3xl font-bold mb-6 text-center">
            {isSignup ? "Sign Up" : "Sign In"}
          </h2>
          {/*Conditional Rendering for 'Full name' Input:*/}
          {isSignup &&
            <input
              type="text"
              placeholder="Full name"
              className="w-full p-3 mb-4 bg-gray-800 bg-opacity-70 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />}

          <input
            ref={email}
            type="email"
            placeholder="Email or phone number"
            className="w-full p-3 mb-4 bg-gray-800 bg-opacity-70 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />

          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 bg-gray-800 bg-opacity-70 border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
          />
          <p className="text-red-500 text-sm mb-4">
            {errorMessage}
          </p>

          <button
            onClick={e => {
              e.preventDefault();
              handleButtonClick();
            }}
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 transition-colors rounded font-semibold"
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </button>

          <div className="flex justify-between items-center mt-4 text-sm text-gray-400">
            <label className="flex items-center space-x-2">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="hover:underline">
              Need help?
            </a>
          </div>

          <p className="mt-8 text-gray-400 text-sm text-center">
            {isSignup ? "Already have an account" : "New to Netflix?"}

            <a
              className="text-white hover:underline"
              onClick={toggleSignupForm}
            >
              {isSignup ? "Sign In" : "Sign up now"}
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
