import React from "react";

import { isEmpty } from "ramda";

import Badge from "./Badge";

const List = ({ categories }) => {
  if (isEmpty(categories)) return null;

  return (
    <div className="flex items-center gap-2">
      {categories.map(category => (
        <Badge key={category.name} {...category} />
      ))}
    </div>
  );
};

export default List;
