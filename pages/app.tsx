import { useState, useEffect } from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { Button } from "@mui/material";
import { Container } from "../styles/pages/app.style";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

const user = supabase.auth.user();

const App: NextPage = () => {
  const router = useRouter();

  const SignOut = async () => {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  };

  useEffect(() => {
    !user ? router.push("/") : null;
  }, [router]);

  return (
    <>
      <Head>
        <title>doto | App</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Button
          variant="contained"
          disableElevation
          color="warning"
          onClick={SignOut}
        >
          Sign out
        </Button>
      </Container>
    </>
  );
};

export default App;
