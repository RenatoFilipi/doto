import type { GetServerSideProps, NextPage } from "next";

import { Button } from "@mui/material";
import { Container } from "../styles/pages/index.style";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return { props: {}, redirect: { destination: "/app" } };
  }
  return { props: {} };
};

const Home: NextPage = () => {
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
