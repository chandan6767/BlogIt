import { QUERY_KEYS } from "constants/query";

import authApi from "apis/auth";
import { useMutation, useQueryClient } from "react-query";

export const useSignup = ({ onSuccess, onError } = {}) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: payload => authApi.signup(payload),
    onSuccess: (...args) => {
      queryClient.invalidateQueries([QUERY_KEYS.USER]);
      onSuccess?.(...args);
    },
    onError: (...args) => {
      onError?.(...args);
    },
  });
};
