import { RESULT_OK } from '../constants';
import { fetchSuggestionsSuccess, fetchSuggestionsError } from '../actions';
import { autoCompleteReq, handleAutocompleteResults } from '../api/suggestions';
import { put, call } from 'redux-saga/effects';


export default function * searchWorkerSaga(action) {
  const { query } = action
  try {
    const res = yield call(autoCompleteReq,{ input: query });
    console.log('RES', res);
    const { status, error_message, predictions } = res;
    if(status === RESULT_OK) {
      const suggests = handleAutocompleteResults(predictions);
      const results = { suggests };
      yield put(fetchSuggestionsSuccess(results));
    } else {
      yield put(fetchSuggestionsError({ message: error_message }));
    }
  } catch (e) {
    yield put(fetchSuggestionsError(e));
  }
}
