import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import "react-circular-progressbar/dist/styles.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Head>
                <title>Hulu Clone</title>
                <link rel="shortcut icon" href="./favicon.ico" />
                <meta property="og:title" content="Hulu Clone" key="title" />
                <meta
                    property="og:description"
                    content="A fully functional, responsive and user friendly Hulu clone where users can browse and search their favourite movies and shows, sort them into lists and much more...."
                />
                <meta
                    property="og:url"
                    content="https://hulu-clone-amber.vercel.app/"
                />
                <meta
                    property="og:image"
                    content="./hulu-clone-screenshot.png"
                />
                <meta property="og:type" content="website" />
                <meta property="og:" content="" />
            </Head>
            <Component {...pageProps} />
        </Provider>
    );
}

export default MyApp;
