import Head from "next/head";
import { Slide, ToastContainer } from "react-toastify";

import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

import Header from "../components/Header/header";

function MyApp({ Component, pageProps }) {
    return (
        <>
            <Head>
                <title>Ecommerce</title>
                <meta
                    name="description"
                    content="Hardware Ecommerce Prototype"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                transition={Slide}
            />
            <div className="h-screen">
                <Header />
                <div className="bg-purpled-light min-h-full">
                    <Component {...pageProps} />
                </div>
            </div>
        </>
    );
}

export default MyApp;
