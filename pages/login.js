import React, { useState, useEffect } from "react";
import CredentialInputBox from "../components/CredentialInputBox";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getUser, loginUser } from "../utils/user";
import Header from "../components/Header";
import { signInUser } from "../utils/api";

const Login = (props) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();
    const user = getUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/");
        }
    });

    if (user) {
        return <div>Loading...</div>;
    }

    function onChange(e) {
        e.preventDefault();
        setCredentials((prevCredentials) => ({
            ...prevCredentials,
            [e.target.name]: e.target.value,
        }));
    }

    async function submit() {
        setErrorMessage(null);
        try {
            const response = await signInUser(
                credentials.username,
                credentials.password
            );

            if (response.error) {
                const { message } = response.error.toJSON();
                setErrorMessage(message);
            }

            const user = response.user;
            if (!user) return;
            user.access = response.access;

            loginUser(dispatch, user, response.refresh);
        } catch (error) {
            setErrorMessage(error.message);
        }
    }

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
                    <h2 className="text-white text-3xl font-bold lg:text-4xl">
                        Sign in
                    </h2>
                    <p className="text-white text-md lg:text-lg">
                        Enjoy your favourite movies and shows now !
                    </p>
                    <div className="mt-4">
                        <CredentialInputBox
                            title="username"
                            type="text"
                            onChange={onChange}
                        />
                        <CredentialInputBox
                            title="password"
                            type="password"
                            onChange={onChange}
                        />

                        {errorMessage && (
                            <div className="h-auto w-full p-4  text-red-500 text-base font-bold rounded-md">
                                {errorMessage}
                            </div>
                        )}

                        <button
                            className="bg-gray-300 text-black font-bold text-base xl:text-lg rounded-full px-8 py-5 w-full mt-5 focus:outline-none focus:ring hover:bg-gray-100"
                            onClick={submit}
                        >
                            Sign in
                        </button>
                    </div>
                </div>
                <div className="mt-10 text-center mx-auto text-white text-base lg:text-lg">
                    New to Hulu?{" "}
                    <span className="text-white font-bold">
                        <Link href="/signup">Join now</Link>
                    </span>
                </div>
            </div>
        </>
    );
};

export default Login;
