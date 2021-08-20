import React from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  return (
    <div className="Header">
      <div className="Header-top">
        <h1 className="Header-title">know your onions</h1>
      </div>
      <div className="Header-bottom">
        <nav className="Header-nav">
          <NavLink
            to="/home"
            className="Header-navlink"
            activeClassName="active"
          >
            Home
          </NavLink>
          <NavLink
            to="/politicians"
            className="Header-navlink"
            activeClassName="active"
          >
            MPs
          </NavLink>
          {/* <NavLink
            to="/bills"
            className="Header-navlink"
            activeClassName="active"
          >
            Bills
          </NavLink> */}
          <NavLink
            to="/votes"
            className="Header-navlink"
            activeClassName="active"
          >
            Votes
          </NavLink>
        </nav>
      </div>
    </div>
  );
}
