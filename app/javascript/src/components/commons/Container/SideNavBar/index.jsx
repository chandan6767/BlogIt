import React from "react";

import { Articles, Book, Draft } from "@bigbinary/neeto-icons";
import { Avatar } from "@bigbinary/neetoui";

import Item from "./Item";

import routes from "~/routes";

const SideNavBar = () => (
  <aside className="bb-border flex flex-col items-center border-r border-bb-border bg-white p-2 py-6 transition-all duration-500">
    <div className="flex flex-1 flex-col gap-2">
      <Item
        className="bg-black text-white hover:bg-slate-800"
        icon={Book}
        to={routes.root}
      />
      <Item icon={Articles} to={routes.root} />
      <Item icon={Draft} to={routes.posts.create} />
    </div>
    <Avatar
      user={{
        imageUrl: "https://avatars.githubusercontent.com/u/200895547?v=4",
      }}
    />
  </aside>
);

export default SideNavBar;
