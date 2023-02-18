import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import CredentialInputBox from "../components/CredentialInputBox";
import Header from "../components/Header";
import getUser from '../hooks/getUser';
import { signUpUser } from "../api";

const SignUp = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showConfirmationMessage, setShowConfirmationMessage] = useState(false);
  const user = getUser();
  const router = useRouter();

  const isDisabled = loading || credentials.password.length < 6 || credentials.email.length < 6 || credentials.name.length === 0;

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  });

  if (user) {
    return <div className="loader">Loading...</div>;
  }

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value,
    }));
  }

  const handleSubmit = async () => {
    setErrorMessage(null);
    setLoading(true);
    try {
      const response = await signUpUser(credentials);

      if (response.error) {
        const { message } = response.error;
        throw new Error(message);
      }

      const { user } = response.data;
      if (!user) return;

      setShowConfirmationMessage(true);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <div className="mx-32 md:mx-40 my-28 sm:my-44 lg:px-40 xl:px-60 2xl:px-96">
        <div className="bg-hulublue border border-solid border-gray-300 h-auto shadow-xl p-7  rounded-md">
          <h2 className="text-white text-3xl font-bold lg:text-4xl">
            Sign Up
          </h2>
          <p className="text-white text-md lg:text-lg">
            Enjoy your favorite movies and shows now !
          </p>
          <div className="mt-4">
            <CredentialInputBox
              title="name"
              type="text"
              onChange={handleChange}
            />
            <CredentialInputBox
              title="email"
              type="text"
              onChange={handleChange}
            />
            <CredentialInputBox
              title="password"
              type="password"
              onChange={handleChange}
            />

            {errorMessage && (
              <div className="h-auto w-full p-4 text-red-500 text-base font-bold rounded-md">
                {errorMessage}
              </div>
            )}
            {showConfirmationMessage && (
              <div className="h-auto w-full p-4 text-green-500 text-base font-bold rounded-md">
                Please confirm your email address by clicking on the link sent to you over mail.
              </div>
            )}

            <button
              className={`bg-gray-300 text-black font-bold text-base xl:text-lg rounded-full px-8
              py-5 w-full mt-5 focus:outline-none focus:ring ${isDisabled ? 'cursor-not-allowed' : 'hover:bg-gray-100'}`}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Sign Up
            </button>
          </div>
        </div>
        <div className="mt-10 text-center mx-auto text-white text-base lg:text-lg">
          Already have an account?{" "}
          <span className="text-white font-bold">
            <Link href="/login">Login here</Link>
          </span>
        </div>
      </div>
    </>
  );
};

export default SignUp;
