import { LOCATION_CHANGE } from 'connected-react-router';
import { call, apply, fork, take, put } from 'redux-saga/effects';

function* loadBlogData() {
    const req = yield call(fetch, 'http://swapi.dev/api/vehicles');
    const { results } = yield apply(req, req.json);

    yield put({ type: 'LOAD_BLOG', payload: results });
}

export default function* pageLoaderSaga() {
    while (true) {
        const action = yield take(LOCATION_CHANGE);

        if (action.payload.location.pathname.endsWith('blog'))
            yield fork(loadBlogData);
    }
}
