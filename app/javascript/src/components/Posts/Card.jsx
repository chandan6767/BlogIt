import React from "react";

import { DownArrow, UpArrow } from "@bigbinary/neeto-icons";
import { Button, Tag, Typography } from "@bigbinary/neetoui";
import classNames from "classnames";
import dayjs from "dayjs";
import { useVotePost } from "hooks/reactQuery/useVoteApi";
import { Link } from "react-router-dom";

import List from "./Category/List";

import routes from "~/routes";

const Card = ({
  title,
  categories,
  created_at,
  slug,
  user,
  vote,
  is_bloggable,
}) => {
  const formattedDate = dayjs(created_at).format("D MMMM YYYY");

  const { mutate, isLoading } = useVotePost();

  const handleVote = value => {
    mutate({
      slug,
      payload: { value },
    });
  };

  return (
    <div className="flex justify-between gap-6 border-b py-4">
      <div className="space-y-2">
        <Link
          className="flex items-center justify-center gap-2"
          to={routes.posts.show.replace(":slug", slug)}
        >
          <Typography
            className="line-clamp-1 font-libre-baskerville hover:underline"
            style="h3"
          >
            {title}
          </Typography>
          {is_bloggable && <Tag label="Blog it" />}
        </Link>
        <List categories={categories} />
        <div className="font-roboto">
          <Typography className="font-medium" style="body3">
            {user.name}
          </Typography>
          <Typography className="text-xs text-bb-gray-600" style="body3">
            {formattedDate}
          </Typography>
        </div>
      </div>
      <div className="flex h-full flex-col items-center gap-1 px-[5vw]">
        <Button
          icon={UpArrow}
          style="text"
          className={classNames({
            "bg-green-500 font-bold text-white": vote.user === 1,
          })}
          tooltipProps={{
            position: "top",
            content: "Upvote (+1)",
          }}
          onClick={() => handleVote(1)}
        />
        <Typography
          className={classNames({ "animate-spin": isLoading })}
          style="h3"
        >
          {vote.net}
        </Typography>
        <Button
          icon={DownArrow}
          style="text"
          className={classNames({
            "bg-red-500 font-bold text-white": vote.user === -1,
          })}
          tooltipProps={{
            position: "bottom",
            content: "Downvote (-1)",
          }}
          onClick={() => handleVote(-1)}
        />
      </div>
    </div>
  );
};

export default Card;
