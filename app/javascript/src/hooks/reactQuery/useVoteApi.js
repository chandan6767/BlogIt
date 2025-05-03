import { QUERY_KEYS } from "constants/query";

import voteApi from "apis/vote";
import { useMutation, useQueryClient } from "react-query";

export const useVotePost = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ slug, payload }) => voteApi.create(slug, payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.POSTS]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};
