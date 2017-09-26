import { debounce } from './debounce';
import { FETCH_SUGGESTIONS } from '../constants';
import searchWorkerSaga from './worker';

export default function * searchWatcherSaga(){
  yield debounce(FETCH_SUGGESTIONS,searchWorkerSaga)
}
