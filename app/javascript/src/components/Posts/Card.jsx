import React from "react";

import { Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import List from "./Category/List";

import routes from "~/routes";

const Card = ({ title, categories, created_at, slug, user }) => {
  const formattedDate = dayjs(created_at).format("D MMMM YYYY");

  return (
    <div className="space-y-3 border-b py-4">
      <Link to={routes.posts.show.replace(":slug", slug)}>
        <Typography
          className="line-clamp-1 font-libre-baskerville hover:underline"
          style="h3"
        >
          {title}
        </Typography>
      </Link>
      <List categories={categories} />
      <div className="flex items-center gap-4">
        <div className="font-roboto">
          <Typography className="font-medium" style="body3">
            {user.name}
          </Typography>
          <Typography className="text-xs text-bb-gray-600" style="body3">
            {formattedDate}
          </Typography>
        </div>
      </div>
    </div>
  );
};

export default Card;
