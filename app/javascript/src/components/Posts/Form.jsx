import React from "react";

import { Input, Select, Textarea } from "@bigbinary/neetoui";
import classNames from "classnames";

import {
  DESCRIPTION_DEFAULT_ROWS,
  DESCRIPTION_MAX_CHARACTERS,
  TITLE_MAX_CHARACTERS,
} from "./constants";
import { buildCategoryOptions, filterSelectedCategories } from "./utils";

const Form = ({
  title,
  description,
  setTitle,
  setDescription,
  isCategoriesLoading,
  categories,
  setSelectedCategories,
  selectedCategories,
}) => {
  const titleMaxLength = TITLE_MAX_CHARACTERS;
  const descriptionMaxLength = DESCRIPTION_MAX_CHARACTERS;
  const defaultRows = DESCRIPTION_DEFAULT_ROWS;

  const categoryOptions = buildCategoryOptions(categories);
  const selectedOptions = buildCategoryOptions(
    filterSelectedCategories(categories, selectedCategories)
  );

  const handleCategoriesChange = selectedOptions =>
    setSelectedCategories(
      selectedOptions.map(option => ({
        id: option.value,
        name: option.label,
      }))
    );

  return (
    <form className="mx-auto w-full max-w-7xl space-y-4">
      <div className="relative w-full">
        <Input
          required
          label="Title"
          placeholder="Post title (Max 125 Characters Allowed)"
          value={title}
          onBlur={e => setTitle(e.target.value.trim())}
          onChange={e => setTitle(e.target.value.slice(0, titleMaxLength))}
        />
        <span
          className={classNames(
            "absolute right-0 top-0 text-xs text-bb-gray-600",
            { "text-red-500": title.length >= titleMaxLength }
          )}
        >
          {title.length}/{titleMaxLength}
        </span>
      </div>
      <div>
        <Select
          isMulti
          isSearchable
          required
          disabled={isCategoriesLoading}
          label="Category"
          options={categoryOptions}
          placeholder="Search category"
          value={selectedOptions}
          onChange={handleCategoriesChange}
        />
      </div>
      <div className="relative w-full">
        <Textarea
          required
          label="Description"
          placeholder="Post description (Max 10000 Characters Allowed)"
          rows={defaultRows}
          value={description}
          onBlur={e => setDescription(e.target.value.trim())}
          onChange={e =>
            setDescription(e.target.value.slice(0, descriptionMaxLength))
          }
        />
        <span
          className={classNames(
            "absolute right-0 top-0 text-xs text-bb-gray-600",
            { "text-red-500": description.length >= descriptionMaxLength }
          )}
        >
          {description.length}/{descriptionMaxLength}
        </span>
      </div>
    </form>
  );
};

export default Form;
