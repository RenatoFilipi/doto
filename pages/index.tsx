import { useEffect } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Container } from "../styles/pages/index.style";
import { Button } from "@mui/material";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return { props: {}, redirect: { destination: "/app" } };
  }
  return { props: {} };
};

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    const user = supabase.auth.user();
    if (user) {
      router.push("/app");
    }
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
      </Container>
    </>
  );
};

export default Home;
