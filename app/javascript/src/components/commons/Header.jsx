import React from "react";

import PageTitle from "./PageTitle";

const Header = ({ pageTitle, actionBlock }) => (
  <div className="flex items-center justify-between px-[5vw] pb-4 pt-[2vw]">
    <PageTitle title={pageTitle} />
    {actionBlock ? (
      <div className="flex items-center gap-4">{actionBlock}</div>
    ) : null}
  </div>
);

export default Header;
