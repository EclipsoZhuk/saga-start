import { delay, call, fork, all } from 'redux-saga/effects';

function* auth() {
    yield delay(2000);

    console.log('auth ok');

    return true;
}

function* loadUsers() {
    const req = yield call(fetch, 'https://swapi.dev/api/people');
    const data = yield call([req, req.json]);

    console.log('data: ', data);
}

export default function* loadBasicData() {
    yield all([fork(auth), fork(loadUsers)]);
}
