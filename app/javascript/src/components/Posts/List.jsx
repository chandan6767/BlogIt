import React from "react";

import classNames from "classnames";

import Card from "./Card";

const List = ({ className, posts }) => (
  <div className={classNames([className], "divide-bb-border")}>
    {posts.map(post => (
      <Card key={post.id} {...post} />
    ))}
  </div>
);

export default List;
