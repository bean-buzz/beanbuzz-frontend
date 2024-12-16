import React from "react";
import Navbar from "../Navbar";

export default function PublicLayout({ children }) {
  return (
    <div>
      <Navbar />
      <div className="content">{children}</div>
    </div>
  );
}
