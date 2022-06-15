import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader.jsx";
import { MdDeleteOutline, MdEdit, MdAddCircleOutline } from 'react-icons/md';
import logo from "./logo.png";

const NavItem = (props) => {
  const { label, to, children } = props.item;
  if (children) {
    return <NavItemHeader item={props.item} />;
  }
  return (
    <NavLink
      exact={to}
      to={to}
      className="navItem"
      activeclassname="activeNavItem"
    >
        <img className="navIcon" src={logo} alt="logo" />
        <span className="navLabel">{label}</span>

      <div>
        <MdDeleteOutline className="actionButton" onClick={() => props.deleteCollection(to.split("/")[1])}/>
      </div>
    </NavLink>
  );
};

export default NavItem;
