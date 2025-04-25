import React from "react";

import classnames from "classnames";

const PageLoader = ({ className = "" }) => (
  <div className={classnames([className], "flex items-center justify-center")}>
    <h1 className="text-lg leading-5">Loading...</h1>
  </div>
);

export default PageLoader;
