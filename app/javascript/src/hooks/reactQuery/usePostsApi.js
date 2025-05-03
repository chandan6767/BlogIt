import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from "constants/pagination";
import { QUERY_KEYS } from "constants/query";

import postsApi from "apis/posts";
import { useMutation, useQuery, useQueryClient } from "react-query";

export const useFetchPosts = ({
  selectedCategories = [],
  page = DEFAULT_PAGE_NUMBER,
  perPage = DEFAULT_PAGE_SIZE,
  onlyMyPosts = false,
  status,
  title,
} = {}) => {
  const categoryIds =
    Array.isArray(selectedCategories) &&
    selectedCategories.length > 0 &&
    typeof selectedCategories[0] === "object"
      ? selectedCategories.map(category => category.id)
      : selectedCategories;

  return useQuery({
    queryKey: [
      QUERY_KEYS.POSTS,
      categoryIds,
      page,
      perPage,
      onlyMyPosts,
      status,
      title,
    ],
    queryFn: () =>
      postsApi.fetch({
        categoryIds,
        page,
        perPage,
        onlyMyPosts,
        status,
        title,
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

export const useUpdatePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ payload, slug }) => postsApi.update(payload, slug),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};

export const useDeletePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: slug => postsApi.destroy(slug),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};
