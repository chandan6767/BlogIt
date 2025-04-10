import React from "react";

import classnames from "classnames";
import SideNavBar from "components/SideNavBar";
import PropTypes from "prop-types";

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
