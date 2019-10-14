import {ADD_ACTION_MUSK, ADD_SUCCESS, ERROR_DATA} from "./actionsTypes";

export const add = (weight_cat, comments) => async dispatch => {
    dispatch(actionsMusk(true));

    fetch('https://api.murka.mr-earnest.ru/add_weight', {
        method: 'POST', body: JSON.stringify({
            weight_cat: weight_cat,
            comments: comments
        }), headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')}
    }).then((response) => {
        if (response.status !== 200) {
            response.json().then(data => {
                dispatch(actionError(data.message));
            });
            throw new Error("o_O");
        }
        return response.json();
    }).then((data) => {
        if (data.status === "ok") {
            dispatch(addSuccess());
        }
        dispatch(actionsMusk(false));
    }).catch((error) => {
        console.log(error);
        dispatch(actionsMusk(false));
    });
};

export function actionsMusk(bool_musk) {
    return {
        type: ADD_ACTION_MUSK,
        bool_musk: bool_musk
    }
}

export function actionError(message) {
    return {
        type: ERROR_DATA,
        message: message
    }
}

export function addSuccess() {
    return {
        type: ADD_SUCCESS
    }
}