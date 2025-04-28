import React, { useState } from "react";

import { Articles, Book, Draft, Folder } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";

import Categories from "./Categories";
import Item from "./Item";
import UserProfile from "./UserProfile";

import routes from "~/routes";

const SideNavBar = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const toggleCategoriesOpen = () => setIsCategoriesOpen(prev => !prev);

  return (
    <div className="flex">
      <aside className="bb-border flex flex-col items-center border-r border-bb-border bg-white p-2 py-6 transition-all duration-500">
        <nav className="flex flex-1 flex-col items-center gap-2">
          <Item
            className="!bg-bb-purple !text-white hover:!bg-bb-purple"
            icon={Book}
            to={routes.root}
          />
          <Item icon={Articles} to={routes.root} />
          <Item icon={Draft} to={routes.posts.create} />
          <Button
            className="w-auto flex-shrink-0"
            icon={Folder}
            size="large"
            style="text"
            onClick={toggleCategoriesOpen}
          />
        </nav>
        <UserProfile />
      </aside>
      {isCategoriesOpen && <Categories />}
    </div>
  );
};

export default SideNavBar;
