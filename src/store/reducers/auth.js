import {ACTION_MUSK, AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionsTypes";

const initialState = {
    auth: false,
    is_musk: false
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, auth: true
            };
        case AUTH_LOGOUT:
            return {
                ...state, auth: false
            };
        case ACTION_MUSK:
            return {
                ...state, is_musk: action.boolmusk
            };
        default:
            return state
    }

}