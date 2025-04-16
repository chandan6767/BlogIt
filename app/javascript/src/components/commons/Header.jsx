import React from "react";

import PageTitle from "./PageTitle";

const Header = ({ pageTitle, actionBlock }) => (
  <div className="flex items-center justify-between border-b px-10 py-3">
    <PageTitle title={pageTitle} />
    {actionBlock ? (
      <div className="flex items-center gap-4">{actionBlock}</div>
    ) : null}
  </div>
);

export default Header;
