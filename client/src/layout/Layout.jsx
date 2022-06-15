import React from "react";
const Sidebar = React.lazy(() => import("./components/Sidebar/Sidebar.jsx"));

const Layout = (props) => {
  const { children } = props;
  return (
    <div className="layout">
      <aside className="aside">
        <Sidebar />
      </aside>
      <div className="content">
        {/* <header className="header">workplace name/collection name/block name</header> */}
        <main className="main">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
