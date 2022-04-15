import {
  Button,
  IconButton,
  Link as MuiLink,
  Snackbar,
  TextField,
} from "@mui/material";
import { Container, MyCard } from "../styles/pages/login.style";
import type { GetServerSideProps, NextPage } from "next";

import CloseIcon from "@mui/icons-material/Close";
import Head from "next/head";
import Link from "next/link";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { useState } from "react";

interface ErrorProps {
  isError: boolean;
  message: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  if (user) {
    return { props: {}, redirect: { destination: "/app" } };
  }
  return { props: {} };
};

const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<ErrorProps>({
    isError: false,
    message: "",
  });

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const SupabaseSignIn = async () => {
    try {
      if (email.trim() === "" || password.trim() === "") {
        setOpen(true);
        throw new Error("Information not provided");
      }

      setIsLoading(true);
      const { user, session, error } = await supabase.auth.signIn({
        email: email,
        password: password,
      });

      if (error) {
        setIsLoading(false);
        setOpen(true);
        throw new Error(error.message);
      }

      if (user) {
        setIsLoading(false);
        setIsSuccess(true);
        router.push("/app");
      }
    } catch (error) {
      if (error instanceof Error) {
        setError({ isError: true, message: error.message });
        setPassword("");
      }
    }
  };

  return (
    <>
      <Head>
        <title>doto | login</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Container>
        <form onSubmit={(e) => e.preventDefault()}>
          <MyCard variant="outlined">
            <div className="header">
              <h1>Log in</h1>
              <span>See your todos gets done</span>
            </div>
            <div className="body">
              <TextField
                fullWidth
                type="email"
                id="email"
                label="Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                type="password"
                id="password"
                label="Password"
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button
                fullWidth
                size="large"
                variant="contained"
                color={isSuccess ? "success" : "primary"}
                disableElevation
                onClick={SupabaseSignIn}
              >
                {isLoading ? "Loading..." : isSuccess ? "Success" : "Log in"}
              </Button>
            </div>
            <div className="footer">
              <Link href={"/signup"} passHref>
                <MuiLink>Create account</MuiLink>
              </Link>
              <Link href={"/"} passHref>
                <MuiLink>Go back to landing</MuiLink>
              </Link>
            </div>
          </MyCard>
        </form>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={error.message}
          action={action}
        />
      </Container>
    </>
  );
};

export default Login;
