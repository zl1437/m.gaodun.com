import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware';
import rootReducer from '../reducers'

export default function configure(initialState) {
    const create = global.devToolsExtension
        ? global.devToolsExtension()(createStore)
        : createStore
    const createStoreWithMiddleware = applyMiddleware(
        promiseMiddleware({
            promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
        }),
        thunkMiddleware,
    )(create)
    const store = createStoreWithMiddleware(rootReducer, initialState)
    return store
}
