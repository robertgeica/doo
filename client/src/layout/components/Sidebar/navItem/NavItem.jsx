import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader.jsx";
import logo from "./logo.png";

const NavItem = (props) => {
  const { label, icon, to, children } = props.item;

  if (children) {
    return <NavItemHeader item={props.item} />;
  }

  return (
    <NavLink exact to={to} className="navItem" activeClassName="activeNavItem">
      <img className="navIcon" src={logo} />
      <span className="navLabel">{label}</span>
    </NavLink>
  );
};

export default NavItem;
