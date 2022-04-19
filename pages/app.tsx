import { Container, MyP } from "../styles/pages/app.style";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  return (
    <>
      <Head>
        <title>doto | app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <MyP>{email}</MyP>
      </Container>
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
