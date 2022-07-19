import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import CredentialInputBox from "../components/CredentialInputBox";
import Header from "../components/Header";
import getUser from '../hooks/getUser';
import { loginUser } from "../utils/user";
import { signUpUser } from "../api";

const SignUp = () => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        name: "",
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
        return <div className="loader">Loading...</div>;
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
            const response = await signUpUser(
                credentials.username,
                credentials.password,
                credentials.name
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
            <div className="mx-32 md:mx-40 my-28 sm:my-44 lg:px-40 xl:px-60 2xl:px-96">
                <div className="bg-hulublue border border-solid border-gray-300 h-auto shadow-xl p-7  rounded-md">
                    <h2 className="text-white text-3xl font-bold lg:text-4xl">
                        Sign Up
                    </h2>
                    <p className="text-white text-md lg:text-lg">
                        Enjoy your favourite movies and shows now !
                    </p>
                    <div className="mt-4">
                        <CredentialInputBox
                            title="name"
                            type="text"
                            onChange={onChange}
                        />
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
