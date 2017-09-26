import { createSelector } from 'reselect';

export const getFunnel2 = state => state.get('funnel2Property');

// is this meant to be 
export const getUserInput =  data => {
    return data.get('userInput');
};

export const getSuggests = data => { 
  return data.get('suggests');
};

export const getIsLoading = data => {
    return data.get('isLoading');
};

export const getPropertySuggestData = data => {
    const userInput = getUserInput(data);
    const isLoading = getIsLoading(data);
    const suggests = getSuggests(data);
    return {
        userInput,
        isLoading,
        suggests
    };
};

export const getPropertyData = createSelector(
    getFunnel2,
    getPropertySuggestData
);