import dayjs from "dayjs";

export const countCharacters = string => string.length;

export const formatDate = (date, format = "") =>
  dayjs(date).format(format || "D MMMM YYYY");

export const buildCategoryOptions = categories =>
  categories?.map(category => ({
    label: category.name,
    value: category.id,
  })) || [];

export const filterSelectedCategories = (categories, selectedCategories) =>
  categories.filter(category =>
    selectedCategories.some(selected => selected.id === category.id)
  );
