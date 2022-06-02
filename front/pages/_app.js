import "../styles/globals.css";
import React from "react";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Subd labs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Component {...pageProps} />
    </React.Fragment>
  );
}
