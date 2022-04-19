import { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: AppLayoutProps) {
  return (
    <>
      <h1>LAYOUT</h1>
      <div>{children}</div>
    </>
  );
}
