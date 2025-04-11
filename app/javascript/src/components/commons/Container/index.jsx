import React from "react";

import classnames from "classnames";
import PropTypes from "prop-types";

import SideNavBar from "./SideNavBar";

const Container = ({ children, className = "" }) => (
  <div className="flex h-screen overflow-hidden">
    <SideNavBar />
    <div className={classnames("flex-1", [className])}>{children}</div>
  </div>
);

Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
