import Head from "next/head";
import { Slide, ToastContainer } from "react-toastify";

import "tailwindcss/tailwind.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";

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
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <ToastContainer
                position="bottom-right"
                autoClose={4000}
                transition={Slide}
            />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
