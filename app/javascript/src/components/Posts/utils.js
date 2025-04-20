import dayjs from "dayjs";

export const countCharacters = string => string.length;

export const formatDate = date => dayjs(date).format("D MMMM YYYY");

export const buildCategoryOptions = categories =>
  categories?.map(category => ({
    label: category.name,
    value: category.id,
  })) || [];
