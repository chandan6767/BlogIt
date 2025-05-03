import { either, isEmpty, isNil, mergeLeft, reject, trim } from "ramda";
import { buildUrl } from "utils/url";

const isBlank = either(isNil, value => isEmpty(trim(value)));

const filterNonEmpty = reject(isBlank);

export const updateQueryParams = ({ params, queryParams, history, route }) => {
  const updatedParams = filterNonEmpty(mergeLeft(params, queryParams));
  history.replace(buildUrl(route, updatedParams));
};

export const clearQueryParams = ({ history, route }) => {
  history.replace(buildUrl(route, {}));
};
