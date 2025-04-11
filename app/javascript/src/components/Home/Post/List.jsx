import React from "react";

import Card from "./Card";

const List = ({ posts }) => (
  <div className="flex-1 divide-y divide-bb-border overflow-y-auto">
    {posts.map(post => (
      <Card key={post.id} {...post} />
    ))}
  </div>
);

export default List;
