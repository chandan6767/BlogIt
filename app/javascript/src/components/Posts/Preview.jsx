import React from "react";

import { Avatar, Tag, Typography } from "@bigbinary/neetoui";
import { Container } from "components/commons";
import useLocalStorage from "hooks/useLocalStorage";
import { isEmpty, isNil } from "ramda";
import { getFromLocalStorage } from "utils/storage";

import Category from "./Category/List";
import {
  POST_CREATE_PREVIEW_DATA_KEY,
  POST_EDIT_PREVIEW_DATA_KEY,
  POST_STATUS,
} from "./constants";
import { formatDate } from "./utils";

const Preview = ({ location }) => {
  const { search } = location;

  const params = new URLSearchParams(search);
  const previewSource = params.get("source");
  const slug = params.get("slug");

  const previewKey =
    previewSource === "edit" && slug
      ? `${POST_EDIT_PREVIEW_DATA_KEY}::${slug}`
      : POST_CREATE_PREVIEW_DATA_KEY;

  const [post] = useLocalStorage(previewKey, {});

  const currentUserName = getFromLocalStorage("authUserName");

  const isPostInvalid = isNil(post) || isEmpty(post);

  if (isPostInvalid) {
    return (
      <Container>
        <div className="flex flex-1 items-center justify-center">
          <Typography style="h4">
            No post data available for preview.
          </Typography>
        </div>
      </Container>
    );
  }

  const lastPublished = formatDate(post?.updated_at);

  const isDraft = post?.status === POST_STATUS.DRAFT;

  return (
    <Container className="p-16">
      <div className="absolute left-0 right-0 top-0 m-auto w-48 animate-pulse rounded-b-2xl bg-bb-purple px-8 py-2 text-center font-mono text-lg font-medium uppercase text-white shadow-lg lg:text-xl">
        Preview
      </div>
      <div className="mx-auto w-full max-w-7xl space-y-6">
        <Category categories={post?.categories} />
        <div className="space-y-4 border-b border-dashed pb-4">
          <div className="flex items-start justify-between gap-4">
            <Typography className="font-libre-baskerville font-bold" style="h1">
              {post?.title}
            </Typography>
            {isDraft && (
              <Tag label="Draft" size="large" style="danger" type="solid" />
            )}
          </div>
          <div className="flex items-center gap-4">
            <Avatar
              size="large"
              user={{
                name: currentUserName,
              }}
            />
            <div className="font-roboto">
              <Typography className="font-medium" style="body1">
                {currentUserName}
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

export default Preview;
