import type { ReactNode } from "react";
import "./bbb.css";

export default function BuiltBeyondBordersLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <div className="bbb-root">{children}</div>;
}
