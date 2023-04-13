import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Link from "next/link";
import { useRouter } from "next/router";
import Header from '../components/Header';
import getUser from '../hooks/getUser';
import { signOut } from '../api/user';
import { logout } from '../redux/auth';
import { resetLists } from '../redux/list';
import { removeAuthToken, removeRefreshToken } from '../utils/token';

export default function Account() {
  const user = getUser();
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSignOut = async () => {
    const error = await signOut();

    if (!error) {
      dispatch(logout());
      dispatch(resetLists());
      removeRefreshToken();
      removeAuthToken();
      router.push("/");
    }
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Header />
      <div className="mx-32 md:mx-40 my-44 lg:px-40 xl:px-60 2xl:px-96">
        <Link href="/">
          <img
            src="/hulu_logo.png"
            alt="Linkedin"
            height="20px"
            className="h-8 mb-5 cursor-pointer"
          />
        </Link>

        <div className="bg-hulublue border border-solid border-gray-300 h-auto shadow-xl p-7  rounded-md">
          You are currently signed in as {" "}
          <span className="text-green-500">
            {user.name}
          </span>
          <br />

          <button
            className="bg-gray-300 text-black font-bold text-base xl:text-lg rounded-full px-8 py-5 w-full mt-5 focus:outline-none focus:ring hover:bg-gray-100"
            onClick={handleSignOut}
          >
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
