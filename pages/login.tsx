import { useState, useEffect } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { Container, MyCard } from "../styles/pages/login.style";
import { Button, TextField } from "@mui/material";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";

const user = supabase.auth.user();

const Login: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassoword] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);

  const SupabaseSignIn = async () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("information not provided");
      return;
    }

    setLoading(true);
    const { user, session, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });

    user ? router.push("/app") : null;

    setLoading(false);
  };

  useEffect(() => {
    user ? router.push("/app") : null;
  }, [router]);

  return (
    <>
      <Head>
        <title>doto | login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <MyCard>
          <TextField
            type="text"
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
            color="primary"
            disableElevation
            onClick={SupabaseSignIn}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
        </MyCard>
      </Container>
    </>
  );
};

export default Login;
