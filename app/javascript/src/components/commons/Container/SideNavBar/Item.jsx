import React from "react";

import classNames from "classnames";
import { NavLink } from "react-router-dom";

const Item = ({ to, icon: Icon, className }) => (
  <NavLink
    to={to}
    className={classNames(
      "flex items-center justify-center rounded p-2 text-center",
      { "hover:bg-gray-100": !className },
      className
    )}
  >
    <Icon />
  </NavLink>
);

export default Item;
