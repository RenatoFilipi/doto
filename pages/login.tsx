import { NextPage } from "next";
import { Container, MyCard } from "../styles/pages/login.style";
import { Button, TextField } from "@mui/material";

const Login: NextPage = () => {
  return (
    <>
      <Container>
        <MyCard>
          <TextField type="text" id="email" label="Email" variant="outlined" />
          <TextField
            type="password"
            id="password"
            label="Password"
            variant="outlined"
          />
          <Button variant="contained">Login</Button>
        </MyCard>
      </Container>
    </>
  );
};

export default Login;
