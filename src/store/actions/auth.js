import {ACTION_MUSK, AUTH_LOGOUT, AUTH_SUCCESS} from "./actionsTypes";

export const auth = (username, password) => async dispatch => {
    dispatch(actionMusk(true));
    fetch('https://api.murka.mr-earnest.ru/login', {
        method: 'POST', body: JSON.stringify({
            username: username,
            password: password
        }), headers: {'content-type': 'application/json'}
    }).then((responce) => {
        if (responce.status !== 200) {
            throw new Error("o_O");
        }
        return responce.json();
    }).then((data) => {
        if (data.token) {
            dispatch(authSuccess(data.token));
            dispatch(actionMusk(false));
        }
    }).catch((error) => {
        console.log(error);
        dispatch(actionMusk(false));
    });
};

export function authSuccess(token) {
    localStorage.setItem('token', token);
    return {
        type: AUTH_SUCCESS
    }
}

export function logOut() {
    fetch('https://api.murka.mr-earnest.ru/logout', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'Authorization': localStorage.getItem('token')}
    }).catch(e => {
        console.log(e)
    });
    localStorage.removeItem('token');
    return {
        type: AUTH_LOGOUT
    }
}

export function actionMusk(boolmusk) {
    console.log('Маска:', boolmusk);
    return {
        type: ACTION_MUSK,
        boolmusk: boolmusk
    }

}
