import { Nav } from "./Nav";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AppLayoutProps) {
  return (
    <>
      <Nav>{children}</Nav>
    </>
  );
}
