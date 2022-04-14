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
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
