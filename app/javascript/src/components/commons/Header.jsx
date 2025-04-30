import React from "react";

import PageTitle from "./PageTitle";

const Header = ({ pageTitle, actionBlock }) => (
  <div className="flex w-full items-center justify-between">
    <PageTitle title={pageTitle} />
    {actionBlock ? (
      <div className="flex items-center gap-2">{actionBlock}</div>
    ) : null}
  </div>
);

export default Header;
