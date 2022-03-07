import { call, all, spawn, take, fork, cancel } from 'redux-saga/effects';
import loadBasicData from './initialSagas';
import pageLoaderSaga from './pageLoaderSaga';

function* fetchPlanetsData(signal) {
    console.log('LOAD_SOME_DATA start');

    const res = yield call(fetch, 'https://swapi.dev/api/planets', { signal });
    const { results } = yield call([res, res.json]);
    console.log('LOAD_SOME_DATA completed', results);
}

export function* loadOnAction() {
    // Отрабатывает только последний, все остальные CANCEL
    let task;
    let abortController = new AbortController();
    while (true) {
        yield take('LOAD_SOME_DATA');
        if (task) {
            abortController.abort();
            yield cancel(task);
            abortController = new AbortController();
        }
        task = yield fork(fetchPlanetsData, abortController.signal);
    }
}

export default function* rootSaga() {
    const sagas = [loadBasicData, pageLoaderSaga, loadOnAction];

    const retrySagas = yield sagas.map(saga => {
        return spawn(function* () {
            while (true) {
                try {
                    yield call(saga);
                    break;
                } catch (error) {
                    console.log(error);
                }
            }
        });
    });

    yield all(retrySagas);
}
