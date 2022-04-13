import styled from "@emotion/styled";

import { Card } from "@mui/material";

export const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyCard = styled(Card)`
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
