import React from "react";

import dayjs from "dayjs";
import { Link } from "react-router-dom";

import routes from "~/routes";

const Card = ({ title, description, created_at, slug }) => {
  const formattedDate = dayjs(created_at).format("D MMMM YYYY");

  return (
    <Link
      className="block space-y-1 border-b py-3"
      to={routes.posts.show.replace(":slug", slug)}
    >
      <h1 className="text-lg font-semibold">{title}</h1>
      <p className="text-sm">{description}</p>
      <p className="text-xs text-bb-gray-600">{formattedDate}</p>
    </Link>
  );
};

export default Card;
