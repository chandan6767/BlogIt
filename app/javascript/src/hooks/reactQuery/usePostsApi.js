import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "constants/pagination";
import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useFetchPosts = (
  selectedCategories = [],
  page = DEFAULT_PAGE_NUMBER,
  perPage = DEFAULT_PAGE_SIZE
) => {
  const categoryIds = selectedCategories.map(category => category.id);

  return useQuery({
    queryKey: [QUERY_KEYS.POSTS, categoryIds, page, perPage],
    queryFn: () =>
      postsApi.fetch({
        categoryIds,
        page,
        perPage,
      }),
  });
};

export const useShowPost = slug => {
  const queryConfig = {
    queryKey: [QUERY_KEYS.POSTS, slug],
    queryFn: () => postsApi.show(slug),
    enabled: !!slug,
  };

  return useQuery(queryConfig);
};

export const useCreatePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => postsApi.create(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};
