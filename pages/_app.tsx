import "../styles/globals.css";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { AppProps } from "next/app";
import React from "react";

import { FirebaseProvider } from "../context/firebaseContext";
import useDesignations from "../hooks/useDesignations";
import usePeople from "../hooks/usePeople";
import useTitles from "../hooks/useTitles";

require("dayjs/locale/pt-br");

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Brazil/West");
dayjs.locale("pt-br");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider
      value={{
        people: usePeople()[0],
        titles: useTitles()[0],
        designations: useDesignations()[0],
      }}
    >
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
