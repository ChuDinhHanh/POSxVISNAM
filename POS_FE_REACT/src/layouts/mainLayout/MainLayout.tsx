import React from "react";
import { Navbar } from "../../components/navbar";

interface Props {
  children: React.ReactNode;
}

export function MainLayout({ children }: Readonly<Props>) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
