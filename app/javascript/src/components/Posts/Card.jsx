import React from "react";

import { Typography } from "@bigbinary/neetoui";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import routes from "~/routes";

const Card = ({ title, description, created_at, slug }) => {
  const formattedDate = dayjs(created_at).format("D MMMM YYYY");

  return (
    <div className="space-y-3 border-b py-3">
      <Link to={routes.posts.show.replace(":slug", slug)}>
        <Typography
          className="font-libre-baskerville hover:underline"
          style="h3"
        >
          {title}
        </Typography>
      </Link>
      <Typography className="line-clamp-2 font-roboto" style="body2">
        {description}
      </Typography>
      <Typography
        className="font-roboto text-xs text-bb-gray-600"
        style="body2"
      >
        {formattedDate}
      </Typography>
    </div>
  );
};

export default Card;
