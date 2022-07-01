import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "./logo.png";
const resolveLinkPath = (childTo, parentTo) => `${parentTo}/${childTo}`;

const NavItemHeader = (props) => {
  const { item } = props;
  const { label, to: headerToPath, children } = item;
  const location = useLocation();

  const [expanded, setExpand] = useState(
    location.pathname.includes(headerToPath)
  );


  const onExpandChange = (e) => {
    e.preventDefault();
    setExpand((expanded) => !expanded);
  };

  return (
    <>
      <button className="navItem navItemHeaderButton" onClick={onExpandChange}>
        <img className="navIcon" src={logo} alt="logo" />
        <span className="navLabel">{label}</span>
        <span
          className={`${"navItemHeaderIcon"} ${
            expanded && "itemExpanded"
          }`}
        >
          {" "}
          &#8595;
        </span>
      </button>

      {expanded && (
        <div className="navChildrenBlock">
          {children.map((item, index) => {
            const key = `${item.label}-${index}`;

            const { label, children } = item;

            if (children) {
              return (
                <div key={key}>
                  <NavItemHeader
                    item={{
                      ...item,
                      to: resolveLinkPath(item.to, props.item.to),
                    }}
                  />
                </div>
              );
            }

            return (
              <NavLink
                key={key}
                to={resolveLinkPath(item.to, props.item.to)}
                className="navItem"
                activeclassname="activeNavItem"
              >
                <img className="navIcon" src={logo} alt="logo" />
                <span className="navLabel">{label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </>
  );
};

export default NavItemHeader;
