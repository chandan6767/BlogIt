import React from "react";

import { Paragraph } from "@bigbinary/neeto-icons";
import { Button } from "@bigbinary/neetoui";
import { Container, PageLoader } from "components/commons";
import List from "components/Posts/List";
import { either, isEmpty, isNil } from "ramda";
import { useHistory } from "react-router-dom";
import useCategoryStore from "stores/useCategoryStore";

import Header from "./commons/Header";

import { useFetchPosts } from "../hooks/reactQuery/usePostsApi";

import routes from "~/routes";

const Home = () => {
  const history = useHistory();

  const { selected } = useCategoryStore();

  const { data, isLoading } = useFetchPosts(selected);
  const posts = data?.data?.posts || [];

  const navigateToCreatePost = () => {
    history.push(routes.posts.create);
  };

  if (isLoading) {
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }

  if (either(isNil, isEmpty)(posts)) {
    return (
      <Container>
        <div className="flex flex-1 flex-col items-center justify-center gap-6">
          <Paragraph className="size-36" />
          <h1 className="text-center text-xl leading-5">
            No posts yet — time to write something awesome! ✍️😄
          </h1>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <Header
        pageTitle="Blog posts"
        actionBlock={
          <Button
            label="Add new blog post"
            size="large"
            onClick={navigateToCreatePost}
          />
        }
      />
      <div className="flex-1 overflow-y-auto p-[5vw] pt-0">
        <List posts={posts} />
      </div>
    </Container>
  );
};

export default Home;
