import "../styles/globals.css";

import { AuthChangeEvent, Session } from "@supabase/supabase-js";
import type { ReactElement, ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

import type { AppProps } from "next/app";
import type { NextPage } from "next";
import { supabase } from "../utils/supabaseClient";
import { useEffect } from "react";

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const theme = createTheme({
  typography: {
    allVariants: {
      fontFamily: "Nunito",
      textTransform: "none",
      fontSize: 16,
    },
  },
});

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  });

  async function updateSupabaseCookie(
    event: AuthChangeEvent,
    session: Session | null
  ) {
    await fetch("/api/auth", {
      method: "POST",
      headers: new Headers({ "Content-Type": "application/json" }),
      credentials: "same-origin",
      body: JSON.stringify({ event, session }),
    });
  }

  return getLayout(
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
