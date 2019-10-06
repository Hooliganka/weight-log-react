import {ADD_ACTION_MUSK, ADD_SUCCESS, ERROR_DATA, REMOVE} from "../actions/actionsTypes";

const initialState = {
    is_musk: false,
    weight_is: false
};

export default function addReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ACTION_MUSK:
            return {
                ...state, is_musk: action.bool_musk
            };
        case ERROR_DATA:
            return {
                ...state, is_musk: false, error_message: action.message
            };
        case ADD_SUCCESS:
            return {
                ...state, weight_is: true
            };
        case REMOVE:
            return {
                ...state, weight_is: false, is_musk: false, error_message: action.message,
            };
        default:
            return state
    }

}