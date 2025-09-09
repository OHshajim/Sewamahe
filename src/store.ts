import { createStore, applyMiddleware, compose } from "redux";
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION__?: () => any;
    }
}

// Redux DevTools + thunk middleware
const middleware = window.__REDUX_DEVTOOLS_EXTENSION__
    ? compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__())
    : applyMiddleware(thunk);

const store = createStore(rootReducer, middleware);

// Export RootState for TypeScript
export type RootState = ReturnType<typeof rootReducer>;
export default store;
