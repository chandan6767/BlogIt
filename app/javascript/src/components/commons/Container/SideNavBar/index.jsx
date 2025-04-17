import React from "react";

import { Articles, Book, Draft } from "@bigbinary/neeto-icons";
import { Avatar } from "@bigbinary/neetoui";

import Item from "./Item";

import routes from "~/routes";

const SideNavBar = () => (
  <aside className="bb-border flex flex-col items-center border-r border-bb-border bg-white p-2 py-6 transition-all duration-500">
    <nav className="flex flex-1 flex-col gap-2">
      <Item
        className="bg-bb-purple text-white hover:bg-bb-purple"
        icon={Book}
        to={routes.root}
      />
      <Item icon={Articles} to={routes.root} />
      <Item icon={Draft} to={routes.posts.create} />
    </nav>
    <Avatar
      user={{
        imageUrl: "https://avatars.githubusercontent.com/u/200895547?v=4",
      }}
    />
  </aside>
);

export default SideNavBar;
