// Définition de l'URL de base de l'API
const URL_API = "http://localhost:3001/api/v1";

// Fonction asynchrone pour l'authentification de l'utilisateur
export async function fetchLogin(props) {
    const response = await fetch(`${URL_API}/user/login`, {
        method: "POST",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: props.email,
            password: props.password,
        }),
    });
    return await response.json();
}

// Fonction asynchrone pour récupérer les informations de profil de l'utilisateur
export async function userProfile(token) {
    const response = await fetch(`${URL_API}/user/profile`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
}

// Fonction asynchrone pour mettre à jour le nom d'utilisateur
export async function userEditProfile(token, username) {
    const response = await fetch(`${URL_API}/user/profile`, {
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            userName: username,
        }),
    });
    return await response.json();
}