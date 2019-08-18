import React from "react";
import "./index.css";
import { Link } from "react-router-dom";
import {routes} from '../../App'

function Nav() {
  return (
    <ul>
      {routes.map((value, index) => {
        return (
          <li key={index}>
            <Link to={value.path}>{value.name}</Link>
          </li>
        );
      })}
    </ul>
  );
}

export default Nav
