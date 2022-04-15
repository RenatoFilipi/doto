import { Container, MyCard } from "../styles/pages/index.style";
import type { GetServerSideProps, NextPage } from "next";

import { Button } from "@mui/material";
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
        <MyCard variant="outlined">
          <div className="header">
            <h1>Doto</h1>
            <span>A todo app project</span>
          </div>
          <div className="body">
            <Link href="/login" passHref>
              <Button
                fullWidth
                size="large"
                variant="contained"
                disableElevation
                color="primary"
              >
                Log in
              </Button>
            </Link>
            <Link href="/signup" passHref>
              <Button
                fullWidth
                size="large"
                variant="outlined"
                disableElevation
                color="primary"
              >
                Sign up
              </Button>
            </Link>
          </div>
        </MyCard>
      </Container>
    </>
  );
};

export default Home;
