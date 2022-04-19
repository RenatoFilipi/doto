import { Card } from "@mui/material";
import styled from "@emotion/styled";

export const Container = styled.div`
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-family: Inter;
`;

export const MyCard = styled(Card)`
  width: 400px;
  max-width: 400px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  border: none;

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h1 {
      font: 800 82px Nunito;
      margin: 0;
      background-color: rgb(63, 70, 251);
      background-image: radial-gradient(
        circle,
        rgba(63, 70, 251, 1) 0%,
        rgba(255, 101, 101, 1) 100%
      );
      background-size: 100%;
      background-repeat: repeat;
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      -moz-background-clip: text;
      -moz-text-fill-color: transparent;
    }

    span {
      font: 500 16px Nunito;
    }
  }

  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
`;
