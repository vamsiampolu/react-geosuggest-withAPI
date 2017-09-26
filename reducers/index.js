import { fromJS } from 'immutable';

import {
  FETCH_SUGGESTIONS,
  FETCH_SUGGESTIONS_SUCCESS,
  FETCH_SUGGESTIONS_ERROR,
  SELECT_SUGGESTION,
} from '../constants';

const initialState = fromJS({
    suggests: [],
    activeSuggest: undefined,
    userInput: '',
    isLoading: false,
    error: null,
});

// determine initial state for the reducer...
export default function propertyReducer (state = initialState, action) {
    const { type } = action;
    switch (type) {
        case FETCH_SUGGESTIONS: {
            const  { query: userInput } = action;
            const nextState = state
              .set('userInput', userInput)
              .set('isLoading', true);
            return nextState;
        }
        case FETCH_SUGGESTIONS_SUCCESS: {
            const { suggests } = action;
            const nextState = state
              .set('suggests', suggests)
              .set('isLoading', false);
            return nextState;    
        } 
        case FETCH_SUGGESTIONS_ERROR: {
            const { error } = action;
            const nextState = state
                .set('isLoading', false)
                .set('error', error);
            return nextState;
        }
        case SELECT_SUGGESTION: {
            const { suggestion } = action;
            const nextState = state
              .set('activeSuggest', suggestion);
            return nextState;
        }
        default:
            return state;
    }
}