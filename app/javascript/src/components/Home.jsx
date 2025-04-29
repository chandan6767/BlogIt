import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "constants/pagination";

import React from "react";

import { Paragraph } from "@bigbinary/neeto-icons";
import { Button, Pagination } from "@bigbinary/neetoui";
import { Container, PageLoader } from "components/commons";
import List from "components/Posts/List";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { either, isEmpty, isNil, mergeLeft, propOr } from "ramda";
import { useHistory } from "react-router-dom";
import useCategoryStore from "stores/useCategoryStore";
import { buildUrl } from "utils/url";

import Header from "./commons/Header";

import routes from "~/routes";

const Home = () => {
  const history = useHistory();

  const queryParams = useQueryParams();

  const { selected } = useCategoryStore();

  const currentPage = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));
  const perPage = Number(propOr(DEFAULT_PAGE_SIZE, "per_page", queryParams));

  const { data, isLoading } = useFetchPosts(selected, currentPage, perPage);
  const posts = data?.data?.posts || [];
  const meta = data?.data?.meta || {};

  const handlePageNavigation = page => {
    history.replace(
      buildUrl(routes.root, mergeLeft({ page, per_page: perPage }, queryParams))
    );
  };

  const navigateToCreatePost = () => {
    history.push(routes.posts.create);
  };

  React.useEffect(() => {
    if (!isLoading && meta.total_pages && currentPage > meta.total_pages) {
      handlePageNavigation(1);
    }
  }, [meta, currentPage, isLoading, history, queryParams]);

  const noPostsAvailable = either(isNil, isEmpty)(posts);

  if (!isLoading && noPostsAvailable) {
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
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col space-y-6 px-[5vw] py-[3vw]">
        <Header
          pageTitle="Blog posts"
          actionBlock={
            <Button label="Add new blog post" onClick={navigateToCreatePost} />
          }
        />
        <div className="flex flex-1 flex-col">
          {isLoading ? (
            <PageLoader className="flex-1" />
          ) : (
            <List posts={posts} />
          )}
        </div>
        <div className="flex items-center justify-end">
          <Pagination
            count={meta.total_count}
            navigate={handlePageNavigation}
            pageNo={meta.current_page || currentPage}
            pageSize={meta.per_page || perPage}
          />
        </div>
      </div>
    </Container>
  );
};

export default Home;
