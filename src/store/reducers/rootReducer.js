import {combineReducers} from 'redux'
import authReducer from "./auth";
import addReducer from "./addWeight";

export default combineReducers({
    auth: authReducer,
    add: addReducer,
})

