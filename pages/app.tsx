import { Container, MyP } from "../styles/pages/app.style";
import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import Layout from "../components/layout";
import type { ReactElement } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }
  return { props: { user } };
};

const App = ({ user }: { user: User }) => {
  const [email, setEmail] = useState<string | undefined>("email not provided!");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    setEmail(user.email);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  }, [user.email]);

  return (
    <>
      <Head>
        <title>doto | app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      {isLoading ? (
        <Container></Container>
      ) : (
        <Container>
          <MyP>{email}</MyP>
        </Container>
      )}
    </>
  );
};

App.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Layout>{page}</Layout>
    </>
  );
};

export default App;
