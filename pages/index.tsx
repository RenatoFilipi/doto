import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { Container } from "../styles/pages/index.style";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

const user = supabase.auth.user();

const Home: NextPage = () => {
  const router = useRouter();

  const signInWithGitHub = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
  };

  useEffect(() => {
    user ? router.push("/app") : null;
  }, [router]);

  return (
    <>
      <Head>
        <title>doto</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <Link href="/login" passHref>
          <Button variant="contained" disableElevation color="primary">
            Login
          </Button>
        </Link>
        <Link href="/signup" passHref>
          <Button variant="contained" disableElevation color="secondary">
            Sign up
          </Button>
        </Link>
        {/* <Button
          style={{ backgroundColor: "#333" }}
          variant="contained"
          disableElevation
          startIcon={<GitHubIcon />}
          onClick={signInWithGitHub}
        >
          Sign in with GitHub
        </Button> */}
      </Container>
    </>
  );
};

export default Home;
