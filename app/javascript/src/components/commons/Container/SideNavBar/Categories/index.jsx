import React, { useState } from "react";

import { Plus, Search } from "@bigbinary/neeto-icons";
import { Button, Spinner } from "@bigbinary/neetoui";
import classNames from "classnames";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";

import New from "./New";

import useCategoryStore from "~/stores/useCategoryStore";

const Categories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toggle, isSelected } = useCategoryStore();

  const { data, isLoading } = useFetchCategories();
  const categories = data?.data?.categories || [];

  const toggleModal = () => setIsModalOpen(isOpen => !isOpen);

  return (
    <aside className="flex w-64 flex-col overflow-y-auto border-r bg-gray-300">
      <div className="flex items-center justify-between  px-4 pb-4 pt-8">
        <span className="font-roboto font-bold uppercase">Categories</span>
        <div className="flex items-center gap-1">
          <Button icon={Search} style="text" />
          <Button icon={Plus} style="text" onClick={toggleModal} />
        </div>
      </div>
      {isLoading ? (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      ) : (
        <ul className="space-y-2 overflow-y-auto p-4">
          {categories.map(category => (
            <li
              key={category.id}
              className={classNames(
                "cursor-pointer rounded border px-2 py-1.5",
                {
                  "border-white bg-white": isSelected(category),
                  "border-gray-400 hover:border-white hover:bg-white":
                    !isSelected(category),
                }
              )}
              onClick={() => toggle(category)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      )}
      <New isModalOpen={isModalOpen} toggleModal={toggleModal} />
    </aside>
  );
};

export default Categories;
