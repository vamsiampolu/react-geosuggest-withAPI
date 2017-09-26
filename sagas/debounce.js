import { delay } from 'redux-saga';
import { take, put, call, fork, cancel } from 'redux-saga/effects';

//The functions debounceFor and debounce were taken from https://github.com/madewithlove/redux-saga-debounce-effect/
export function *debounceFor(pattern, saga, ms, ...args) {
  function *delayedSaga(action) {
      yield call(delay, ms);
      yield call(saga, action, ...args);
  }

  let task;
  while (true) {
    const action = yield take(pattern);
    if (task) {
      yield cancel(task);
    }
    task = yield fork(delayedSaga, action);
  }
}

export function debounce(pattern, handler, ...args) {
    return debounceFor(pattern, handler, 500, ...args);
}
