import { MenuBar } from "./MenuBar";
import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AppLayoutProps) {
  return (
    <>
      <MenuBar />
      <div>{children}</div>
    </>
  );
}
