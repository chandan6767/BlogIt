import React, { useEffect, useState } from "react";

import {
  Button,
  Input,
  Pane,
  Radio,
  Select,
  Typography,
} from "@bigbinary/neetoui";
import { useFetchCategories } from "hooks/reactQuery/useCategoriesApi";
import useQueryParams from "hooks/useQueryParams";
import { useHistory } from "react-router-dom";

import { clearQueryParams, updateQueryParams } from "./utils";

import { POST_STATUS } from "../constants";
import { buildCategoryOptions, filterSelectedCategories } from "../utils";

import routes from "~/routes";

const FiltersPane = ({ isOpen, closePane }) => {
  const [searchKey, setSearchKey] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [status, setStatus] = useState(POST_STATUS.DRAFT);

  const { data, isLoading } = useFetchCategories();
  const categories = data?.data?.categories || [];

  const history = useHistory();

  const queryParams = useQueryParams();

  const categoryOptions = buildCategoryOptions(categories);
  const selectedOptions = buildCategoryOptions(
    filterSelectedCategories(categories, selectedCategories)
  );

  const handleClearFilters = () => {
    clearQueryParams({ history, route: routes.my.posts });
    closePane();
  };

  const handleApplyFilters = () => {
    const categoryIds = selectedCategories
      .map(category => category.id)
      .join(",");

    const filtersParams = {
      title: searchKey,
      status,
      categoryIds,
    };

    updateQueryParams({
      params: filtersParams,
      queryParams,
      history,
      route: routes.my.posts,
    });

    closePane();
  };

  const handleCategoriesChange = selectedOptions =>
    setSelectedCategories(
      selectedOptions.map(option => ({
        id: option.value,
        name: option.label,
      }))
    );

  const handleStatusChange = e => setStatus(e.target.value);

  useEffect(() => {
    if (isOpen) {
      setSearchKey(queryParams.title || "");
      setStatus(queryParams.status || POST_STATUS.DRAFT);

      if (queryParams.categoryIds) {
        const categoryIds = queryParams.categoryIds.split(",");
        setSelectedCategories(
          categories.filter(category =>
            categoryIds.includes(category.id.toString())
          )
        );
      }
    }
  }, []);

  return (
    <Pane closeOnEsc isOpen={isOpen} onClose={closePane}>
      <Pane.Header>
        <Typography className="text-xl font-bold" style="h2" weight="bold">
          Filters
        </Typography>
      </Pane.Header>
      <Pane.Body>
        <div className="w-full space-y-4">
          <Input
            required
            className="w-full flex-grow-0"
            defaultValue={queryParams.title}
            label="Title"
            placeholder="Enter keyword"
            value={searchKey}
            onChange={e => setSearchKey(e.target.value)}
          />
          <Select
            isMulti
            className="w-full"
            disable={isLoading}
            label="Categories"
            options={categoryOptions}
            placeholder="Select categories"
            value={selectedOptions}
            onChange={handleCategoriesChange}
          />
          <Radio label="Status" value={status} onChange={handleStatusChange}>
            <Radio.Item
              defaultChecked
              label="Draft"
              name="status"
              value={POST_STATUS.DRAFT}
            />
            <Radio.Item
              label="Published"
              name="status"
              value={POST_STATUS.PUBLISHED}
            />
          </Radio>
        </div>
      </Pane.Body>
      <Pane.Footer className="flex justify-end space-x-2">
        <Button label="Clear" style="secondary" onClick={handleClearFilters} />
        <Button label="Apply" style="primary" onClick={handleApplyFilters} />
      </Pane.Footer>
    </Pane>
  );
};

export default FiltersPane;
