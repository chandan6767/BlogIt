import React from "react";

import { Tooltip } from "@bigbinary/neetoui";
import { Link } from "react-router-dom";

import routes from "~/routes";

const Title = ({ post }) => {
  const truncated = post.title.length > 50;
  const displayTitle = truncated ? `${post.title.slice(0, 50)}...` : post.title;

  return (
    <Tooltip content={truncated ? post.title : ""} position="top">
      <Link to={routes.posts.edit.replace(":slug", post.slug)}>
        {displayTitle}
      </Link>
    </Tooltip>
  );
};

export default Title;
