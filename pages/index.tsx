import type { NextPage } from "next";
import Link from "next/link";
import { Container } from "../styles/pages/index.style";
import { Button } from "@mui/material";

const Home: NextPage = () => {
  return (
    <>
      <Container>
        <Link href="/login" passHref>
          <Button variant="contained">Login</Button>
        </Link>
      </Container>
    </>
  );
};

export default Home;
