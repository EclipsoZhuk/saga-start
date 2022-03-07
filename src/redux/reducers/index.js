import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import { combineReducers } from 'redux';

export const history = createBrowserHistory();

const initialValue = {
    blog: {},
};

export function appReducer(state = initialValue, { type, payload }) {
    switch (type) {
        case 'LOAD_BLOG':
            return {
                ...state,
                blog: payload,
            };

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    app: appReducer,
    router: connectRouter(history),
});

export default rootReducer;
