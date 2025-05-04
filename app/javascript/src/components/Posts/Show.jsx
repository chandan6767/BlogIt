import React from "react";

import { Download, Edit } from "@bigbinary/neeto-icons";
import { Avatar, Button, Tag, Typography } from "@bigbinary/neetoui";
import { Container, PageLoader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { Link, useParams } from "react-router-dom";
import { getFromLocalStorage } from "utils/storage";

import List from "./Category/List";
import { POST_STATUS } from "./constants";
import { formatDate } from "./utils";

import routes from "~/routes";

const Show = ({ history }) => {
  const currentUserId = Number(getFromLocalStorage("authUserId"));

  const { slug } = useParams();

  const { data, isLoading, isError } = useShowPost(slug);
  const post = data?.data?.post || null;

  if (isError) history.replace(routes.root);

  if (isLoading) {
    return (
      <Container>
        <PageLoader className="flex-1" />
      </Container>
    );
  }

  const lastPublished = formatDate(post?.updated_at);
  const isDraft = post?.status === POST_STATUS.DRAFT;

  return (
    <Container>
      <div className="mx-auto w-full max-w-7xl space-y-6 p-[5vw]">
        <div className="space-y-4 border-b border-dashed pb-4">
          <List categories={post?.categories} />
          <div className="flex items-start justify-between gap-4">
            <Typography className="font-libre-baskerville font-bold" style="h1">
              {post?.title}
            </Typography>
            <div className="flex items-center justify-end gap-2">
              {isDraft && (
                <Tag label="Draft" size="large" style="danger" type="solid" />
              )}
              <Link to="pdf">
                <Button icon={Download} style="text" />
              </Link>
              {post?.user?.id === currentUserId && (
                <Link to="edit">
                  <Button
                    icon={Edit}
                    size="large"
                    style="text"
                    tooltipProps={{
                      content: "Edit",
                      position: "top",
                    }}
                  />
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Avatar
              size="large"
              user={{
                name: post?.user.name,
              }}
            />
            <div className="font-roboto">
              <Typography className="font-medium" style="body1">
                {post?.user.name}
              </Typography>
              <Typography style="body2">{lastPublished}</Typography>
            </div>
          </div>
        </div>
        <Typography
          className="whitespace-pre-wrap font-roboto first-letter:font-libre-baskerville first-letter:text-2xl first-letter:font-bold lg:text-lg"
          style="body1"
        >
          {post?.description}
        </Typography>
      </div>
    </Container>
  );
};

export default Show;
