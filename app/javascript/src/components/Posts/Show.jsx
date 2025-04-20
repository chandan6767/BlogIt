import React from "react";

import { Avatar, Typography } from "@bigbinary/neetoui";
import { Container, PageLoader } from "components/commons";
import { useShowPost } from "hooks/reactQuery/usePostsApi";
import { useParams } from "react-router-dom";

import List from "./Category/List";
import { formatDate } from "./utils";

import routes from "~/routes";

const Show = ({ history }) => {
  const { slug } = useParams();

  const { data, isLoading, isError } = useShowPost(slug);
  const post = data?.data?.post || null;

  if (isError) history.push(routes.root);

  if (isLoading) {
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }

  const createdAt = formatDate(post?.created_at);

  return (
    <Container>
      <div className="mx-auto w-full max-w-7xl space-y-6 p-[5vw]">
        <div className="space-y-4 border-b border-dashed pb-4">
          <List categories={post?.categories} />
          <Typography className="font-libre-baskerville font-bold" style="h1">
            {post?.title}
          </Typography>
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
              <Typography style="body2">{createdAt}</Typography>
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
