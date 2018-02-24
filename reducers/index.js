//import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as postReducer from './post';

const rootReducer = combineReducers({
    //routing,
    config: (state = {}) => state,
    ...postReducer,

});

export default rootReducer;