import {
  SELECT_SUGGESTION,
  FETCH_SUGGESTIONS,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_ERROR,
} from './constants';

export const fetchSuggestionsSuccess = (results) => ({
  type: FETCH_SUGGESTIONS_SUCCESS,
  results,
});

export const fetchSuggestionsError = (error) => ({
  type: FETCH_SUGGESTIONS_ERROR,
  error: error.message,
});

export const fetchSuggestions = (query) => {
  console.log('Inside fetchSuggestions action')
  console.log('Dispatched with query', query);
  return {
    type: FETCH_SUGGESTIONS,
    query,
  };
};

export const selectSuggestion = (suggestion) => ({
  type: SELECT_SUGGESTION,
  suggestion,
});
