import { useEffect, useState } from "react";
import Head from "next/head";
import type { GetServerSideProps } from "next";
import { Button } from "@mui/material";
import { Container, MyP } from "../styles/pages/app.style";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { User } from "@supabase/supabase-js";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }
  return { props: { user } };
};

const App = ({ user }: { user: User }) => {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>("email not provided!");

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  async function SignOut() {
    const { error } = await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <>
      <Head>
        <title>doto | app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <MyP>{email}</MyP>
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
