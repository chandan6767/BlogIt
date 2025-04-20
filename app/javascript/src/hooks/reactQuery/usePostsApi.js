import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useQuery } from "react-query";

export const useFetchPosts = (selectedCategories = []) => {
  const categoryIds = selectedCategories.map(category => category.id);

  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, categoryIds],
    queryFn: () => postsApi.fetch(categoryIds),
  });
};
