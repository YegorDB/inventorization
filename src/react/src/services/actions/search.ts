import {
  GET_SEARCH_RESULTS_REQUEST_PENDING,
  GET_SEARCH_RESULTS_REQUEST_SUCCESS,
  GET_SEARCH_RESULTS_REQUEST_FAILED,
} from '../../consts';
import { SearchType } from '../../enums';
import { TSearchResults } from '../../types';
import { searchRequest } from '../../utils';

// @ts-ignore
export const search = (
  searchType: keyof typeof SearchType,
  searchQuery: string
) => {
  // @ts-ignore
  return function(dispatch) {
    dispatch({
      type: GET_SEARCH_RESULTS_REQUEST_PENDING,
    });

    searchRequest(
      searchType,
      searchQuery,
      (results: TSearchResults) => {
        console.log('search results', results);

        dispatch({
          type: GET_SEARCH_RESULTS_REQUEST_SUCCESS,
          results: results,
        });
      },
      (err: Error) => {
        dispatch({
          type: GET_SEARCH_RESULTS_REQUEST_FAILED,
        });
      }
    );
  };
}
