import React from "react";

import { Avatar } from "@bigbinary/neetoui";
import { NavLink } from "react-router-dom";

const SideNavBar = () => (
  <aside className="bb-border flex flex-col items-center border-r border-bb-border bg-white p-2 py-8 transition-all duration-500">
    <div className="flex flex-1 flex-col gap-4">
      <NavLink className="size-10 text-center" to="/">
        <h1 className="text-3xl font-extrabold">Bi</h1>
      </NavLink>
    </div>
    <Avatar
      user={{
        imageUrl: "https://avatars.githubusercontent.com/u/200895547?v=4",
      }}
    />
  </aside>
);

export default SideNavBar;
