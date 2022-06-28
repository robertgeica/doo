import React from "react";
import { NavLink } from "react-router-dom";
import NavItemHeader from "./NavItemHeader.jsx";
import { MdDeleteOutline, MdEdit, MdAddCircleOutline } from "react-icons/md";
import logo from "./logo.png";
import Emoji from "../../Emoji.js";

const NavItem = (props) => {
  const { label, to, children, icon } = props.item;

  if (children) {
    return <NavItemHeader item={props.item} />;
  }
  return (
    <NavLink
      exact={to}
      to={to}
      className="navItem"
      activeclassname="activeNavItem"
      style={label === "Home" ? { justifyContent: "center" } : {}}
    >
      <span>{icon}</span>
      <span className="navLabel">{label}</span>

      {label !== "Home" && (
        <div>
          <MdDeleteOutline
            className="actionButton"
            onClick={() => props.deleteCollection(to.split("/")[1])}
          />
        </div>
      )}
    </NavLink>
  );
};

export default NavItem;
