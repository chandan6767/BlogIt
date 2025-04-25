export const searchCategories = (categories = [], searchTerm = "") =>
  categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
