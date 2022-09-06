import "../styles/globals.css";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import type { AppProps } from "next/app";
import React from "react";

import { FirebaseProvider } from "../context/firebaseContext";
import useMeetings from "../hooks/useMeetings";
import useMonths from "../hooks/useMonths";
import usePeople from "../hooks/usePeople";

require("dayjs/locale/pt-br");

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Brazil/West");
dayjs.locale("pt-br");

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider
      value={{
        meetings: useMeetings()[0],
        people: usePeople()[0],
        months: useMonths()[0],
      }}
    >
      <Component {...pageProps} />
    </FirebaseProvider>
  );
}

export default MyApp;
