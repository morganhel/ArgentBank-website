// Définition des types d'actions.
export const SET_TOKEN = "SET_TOKEN";
export const SET_USER = "SET_USER";
export const SET_LOGIN = "SET_LOGIN";

// Action pour définir l'état de connexion.
export const setLogin = (isLogin) => ({
    type: SET_LOGIN,
    payload: isLogin,
});

// Action pour définir le token d'authentification.
export const setToken = (token) => ({
    type: SET_TOKEN,
    payload: token,
});

// Action pour définir l'utilisateur.
export const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});