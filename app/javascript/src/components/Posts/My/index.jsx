import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "constants/pagination";

import React, { useCallback, useEffect, useMemo, useState } from "react";

import { Checkbox, CheckboxInactive, Filter } from "@bigbinary/neeto-icons";
import {
  ActionDropdown,
  Button,
  Table,
  Tag,
  Typography,
} from "@bigbinary/neetoui";
import classNames from "classnames";
import { Container, Header, PageLoader } from "components/commons";
import dayjs from "dayjs";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import { useFetchPosts } from "hooks/reactQuery/usePostsApi";
import useQueryParams from "hooks/useQueryParams";
import { mergeLeft, propOr } from "ramda";
import { useHistory } from "react-router-dom";
import { buildUrl } from "utils/url";

import Actions from "./Actions";
import {
  columnData as allColumnData,
  columnKeysForDropdown,
} from "./constants";
import FiltersPane from "./FiltersPane";
import Title from "./Title";

import List from "../Category/List";

import routes from "~/routes";

const My = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState({
    title: true,
    categories: true,
    updated_at: true,
    status: true,
    actions: true,
  });
  const [isFiltersPaneOpen, setIsFiltersPaneOpen] = useState(false);

  const history = useHistory();
  const queryParams = useQueryParams();

  const currentPage = Number(propOr(DEFAULT_PAGE_NUMBER, "page", queryParams));
  const perPage = Number(propOr(DEFAULT_PAGE_SIZE * 2, "perPage", queryParams));
  const status = propOr(null, "status", queryParams);
  const title = propOr(null, "title", queryParams);
  const categoryIds = propOr(null, "categoryIds", queryParams);
  const selectedCategoryIds = categoryIds ? categoryIds.split(",") : [];

  const { data, isLoading } = useFetchPosts({
    page: currentPage,
    perPage,
    onlyMyPosts: true,
    selectedCategories: selectedCategoryIds,
    status,
    title,
  });

  const { data: categoriesData } = useFetchCategories();
  const categories = categoriesData?.data?.categories || [];
  const filteredCategories = categories.filter(category =>
    selectedCategoryIds.includes(category.id.toString())
  );

  const posts = data?.data?.posts || [];
  const meta = data?.data?.meta || {};

  const toggleFiltersPane = useCallback(() => {
    setIsFiltersPaneOpen(prev => !prev);
  }, []);

  const handlePageNavigation = page => {
    history.replace(
      buildUrl(
        routes.my.posts,
        mergeLeft({ page, per_page: perPage }, queryParams)
      )
    );
  };

  const handleRowSelect = selectedKeys => {
    setSelectedRowKeys(selectedKeys);
  };

  useEffect(() => {
    if (!isLoading && meta.total_pages && currentPage > meta.total_pages) {
      handlePageNavigation(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [meta, currentPage, isLoading]);

  const rowData = posts.map(post => ({
    id: post.slug,
    title: <Title post={post} />,
    categories: post.categories.map(category => category.name).join(", "),
    updated_at: dayjs(post.updated_at).format("MMM D, YYYY, HH:mm A"),
    status: post.status.charAt(0).toUpperCase() + post.status.slice(1),
    actions: <Actions post={post} />,
  }));

  const filteredColumnData = useMemo(
    () =>
      allColumnData.filter(
        column => visibleColumns[column.key] || column.key === "title"
      ),
    [visibleColumns]
  );

  const handleCheckboxChange = key => {
    if (key === "title") return;
    setVisibleColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isFiltersApplied = title || status || selectedCategoryIds.length > 0;

  return (
    <Container>
      <div className="mx-auto flex w-full flex-1 flex-col space-y-6 px-[5vw] py-[3vw]">
        <Header pageTitle="My Blog Posts" />
        {isLoading ? (
          <PageLoader className="flex-1" />
        ) : (
          <>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Typography style="h4">
                  {meta.total_count}{" "}
                  {isFiltersApplied ? "results for" : "articles"}
                </Typography>
                {title && <Typography style="h4">"{title}"</Typography>}
                {status && <Tag className="capitalize">{status}</Tag>}
                {selectedCategoryIds.length > 0 && (
                  <List categories={filteredCategories} />
                )}
              </div>
              <div className="flex items-center gap-2">
                <ActionDropdown buttonStyle="secondary" label="Columns">
                  <ActionDropdown.Menu>
                    {columnKeysForDropdown.map(column => (
                      <ActionDropdown.MenuItem.Button
                        disabled={column.key === "title"}
                        key={column.key}
                        className={classNames({
                          "text-blue-600": visibleColumns[column.key],
                          "opacity-50": column.key === "title",
                        })}
                        prefix={
                          visibleColumns[column.key] ? (
                            <Checkbox />
                          ) : (
                            <CheckboxInactive />
                          )
                        }
                        onClick={() => handleCheckboxChange(column.key)}
                      >
                        {column.label}
                      </ActionDropdown.MenuItem.Button>
                    ))}
                  </ActionDropdown.Menu>
                </ActionDropdown>
                <Button
                  icon={Filter}
                  style="secondary"
                  onClick={toggleFiltersPane}
                />
              </div>
            </div>
            <Table
              fixedHeight
              rowSelection
              columnData={filteredColumnData}
              currentPageNumber={meta.current_page || currentPage}
              defaultPageSize={meta.per_page || perPage}
              loading={isLoading}
              rowData={rowData}
              selectedRowKeys={selectedRowKeys}
              totalCount={meta.total_count}
              onRowSelect={handleRowSelect}
            />
          </>
        )}
      </div>
      <FiltersPane closePane={toggleFiltersPane} isOpen={isFiltersPaneOpen} />
    </Container>
  );
};

export default My;
