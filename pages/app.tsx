import { Container, MyP } from "../styles/pages/app.style";
import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import type { GetServerSideProps } from "next";
import Head from "next/head";
import { User } from "@supabase/supabase-js";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setEmail(user.email);
  }, [user.email]);

  async function SignOut() {
    setIsLoading(false);
    const { error } = await supabase.auth.signOut();
    setIsSuccess(true);
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
          color={isSuccess ? "success" : "warning"}
          onClick={SignOut}
        >
          {isLoading ? "Loading..." : isSuccess ? "Success" : "Sign out"}
        </Button>
      </Container>
    </>
  );
};

export default App;
