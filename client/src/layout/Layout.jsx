import React from "react";
import Sidebar from "./components/Sidebar.jsx";

const Layout = (props) => {
  const { children } = props;

  return (
    <div className="layout">
      <aside className="aside">
        <Sidebar />
      </aside>
      <div className="content">
        <header className="header"></header>
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
