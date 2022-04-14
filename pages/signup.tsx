import { useState } from "react";
import Head from "next/head";
import type { NextPage, GetServerSideProps } from "next";
import { Container, MyCard } from "../styles/pages/signup.style";
import { Button, TextField } from "@mui/material";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return { props: {}, redirect: { destination: "/app" } };
  }
  return { props: {} };
};

const SignUp: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const SupabaseSignUp = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("information not provided");
      return;
    }

    setLoading(true);
    const { user, session, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    if (user) {
      router.push("/app");
    }
  };

  return (
    <>
      <Container>
        <Head>
          <title>doto | Sign up</title>
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <form onSubmit={(e) => e.preventDefault()}>
          <MyCard>
            <TextField
              type="email"
              id="email"
              label="Email"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              type="password"
              id="password"
              label="Password"
              variant="outlined"
              value={password}
              onChange={(e) => setPassoword(e.target.value)}
            />
            <Button
              variant="contained"
              color="secondary"
              disableElevation
              onClick={SupabaseSignUp}
            >
              {loading ? "Loading..." : "Sign up"}
            </Button>
          </MyCard>
        </form>
      </Container>
    </>
  );
};

export default SignUp;
