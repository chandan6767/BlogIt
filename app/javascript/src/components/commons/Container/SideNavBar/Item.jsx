import React from "react";

import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Item = ({ to, icon: Icon, className }) => (
  <NavLink
    exact
    to={to}
    className={isActive =>
      classNames(
        "flex items-center justify-center rounded p-2 text-center transition-colors duration-150",
        { "hover:bg-gray-100": !className },
        { "bg-gray-100 hover:bg-gray-100": isActive },
        className
      )
    }
  >
    <Icon />
  </NavLink>
);

export default Item;
