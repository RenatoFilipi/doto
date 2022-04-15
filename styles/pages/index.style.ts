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
