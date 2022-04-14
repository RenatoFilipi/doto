import { useEffect, useState } from "react";
import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import { Button } from "@mui/material";
import { Container, MyP } from "../styles/pages/app.style";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (!user) {
    return { props: {}, redirect: { destination: "/" } };
  }
  return { props: {} };
};

const App: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string | undefined>("email not provided!");

  useEffect(() => {
    const CheckProfile = async () => {
      const user = await supabase.auth.user();
      if (!user) {
        router.push("/");
      } else {
        setEmail(user.email);
      }
    };
    CheckProfile();
  }, [router]);

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
