import { Card } from "@mui/material";
import styled from "@emotion/styled";

export const Container = styled.div`
  height: 97vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyCard = styled(Card)`
  width: 400px;
  max-width: 400px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  .header {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;

    h1 {
      font: 800 24px Nunito;
      margin: 0;
    }

    span {
      font: 500 16px Nunito;
    }
  }

  .body {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    justify-content: flex-start;
    gap: 1rem;
  }
`;
