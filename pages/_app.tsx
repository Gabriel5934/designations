import "../styles/globals.css";

import type { AppProps } from "next/app";
import React from "react";

import { FirebaseProvider } from "../context/firebaseContext";
import useMeetings from "../hooks/useMeetings";
import usePeople from "../hooks/usePeople";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider
      value={{
        meetings: useMeetings()[0],
        people: usePeople()[0],
      }}
    >
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
