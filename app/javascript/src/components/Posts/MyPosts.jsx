import { DEFAULT_PAGE_NUMBER } from "constants/pagination";

import React, { useEffect, useState } from "react";

import { MenuHorizontal } from "@bigbinary/neeto-icons";
import { Dropdown, Table, Tooltip, Typography } from "@bigbinary/neetoui";
import { Container, Header } from "components/commons";
import dayjs from "dayjs";
import {
  useDeletePost,
  useFetchPosts,
  useUpdatePost,
} from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import Logger from "js-logger";
import { mergeLeft, propOr } from "ramda";
import { Link, useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import { POST_STATUS } from "./constants";

import routes from "~/routes";

const MyPosts = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const history = useHistory();

  const queryParams = useQueryParams();

  const currentPage = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));
  const perPage = Number(propOr(8, "perPage", queryParams));

  const { data, isLoading } = useFetchPosts({
    page: currentPage,
    perPage,
    onlyMyPosts: true,
  });

  const posts = data?.data?.posts || [];
  const meta = data?.data?.meta || {};

  const { mutate: updatePost } = useUpdatePost({
    onSuccess: () => {
      // history.replace(routes.posts.show.replace(":slug", slug));
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const { mutate: deletePost } = useDeletePost({
    onSuccess: () => {
      // history.replace(routes.root);
    },
    onError: error => {
      Logger.error(error);
    },
  });

  const updatePostStatus = (slug, status) => {
    updatePost({
      payload: {
        status,
      },
      slug,
    });
  };

  const handlePageNavigation = page => {
    history.replace(
      buildUrl(
        routes.my.posts,
        mergeLeft({ page, per_page: perPage }, queryParams)
      )
    );
  };

  const handleRowSelect = selectedRowKeys => {
    setSelectedRowKeys(selectedRowKeys);
  };

  useEffect(() => {
    if (!isLoading && meta.total_pages && currentPage > meta.total_pages) {
      handlePageNavigation(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta, currentPage, isLoading, history, queryParams]);

  const columnData = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 500,
    },
    {
      title: "Category",
      dataIndex: "categories",
      key: "categories",
      width: 250,
    },
    {
      title: "Last published at",
      dataIndex: "updated_at",
      key: "updated_at",
      width: 200,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      width: 150,
    },
    {
      title: "",
      dataIndex: "actions",
      key: "actions",
    },
  ];

  const rowData = posts.map(post => {
    const truncated = post.title.length > 50;
    const displayTitle = truncated
      ? `${post.title.slice(0, 50)}...`
      : post.title;

    return {
      id: post.slug,
      title: (
        <Tooltip content={truncated ? post.title : ""} position="top">
          <Link to={routes.posts.edit.replace(":slug", post.slug)}>
            {displayTitle}
          </Link>
        </Tooltip>
      ),
      categories: post.categories.map(c => c.name).join(", "),
      updated_at: dayjs(post.updated_at).format("MMM D, YYYY, HH:mm A"),
      status: post.status.charAt(0).toUpperCase() + post.status.slice(1),
      actions: (
        <Dropdown buttonStyle="text" icon={MenuHorizontal} strategy="fixed">
          <Dropdown.Menu>
            {post.status === "draft" ? (
              <>
                <Dropdown.MenuItem.Button
                  onClick={() =>
                    updatePostStatus(post.slug, POST_STATUS.PUBLISHED)
                  }
                >
                  Publish
                </Dropdown.MenuItem.Button>
                <Dropdown.Divider />
                <Dropdown.MenuItem.Button
                  style="danger"
                  onClick={() => deletePost(post.slug)}
                >
                  Delete
                </Dropdown.MenuItem.Button>
              </>
            ) : (
              <>
                <Dropdown.MenuItem.Button
                  onClick={() => updatePostStatus(post.slug, POST_STATUS.DRAFT)}
                >
                  Unpublish
                </Dropdown.MenuItem.Button>
                <Dropdown.Divider />
                <Dropdown.MenuItem.Button
                  style="danger"
                  onClick={() => deletePost(post.slug)}
                >
                  Delete
                </Dropdown.MenuItem.Button>
              </>
            )}
          </Dropdown.Menu>
        </Dropdown>
      ),
    };
  });

  return (
    <Container>
      <div className="mx-auto flex w-full flex-1 flex-col space-y-6 px-[5vw] py-[3vw]">
        <Header pageTitle="My Blog Posts" />
        <Typography style="h4">{meta.total_count} articles</Typography>
        <Table
          fixedHeight
          rowSelection
          columnData={columnData}
          currentPageNumber={meta.current_page || currentPage}
          defaultPageSize={meta.per_page || perPage}
          loading={isLoading}
          rowData={rowData}
          selectedRowKeys={selectedRowKeys}
          totalCount={meta.total_count}
          onRowSelect={handleRowSelect}
        />
      </div>
    </Container>
  );
};

export default MyPosts;
