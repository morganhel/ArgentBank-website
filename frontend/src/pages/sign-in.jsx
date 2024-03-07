import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { fetchLogin, userProfile } from "../requests/user.api";
import { useDispatch } from "react-redux";
import { setLogin, setToken, setUser } from "../redux/actions/user.action";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState(localStorage.getItem("email") || ""); //on regarde dans le local storage si email enregistré sinon nul
    const [password, setPassword] = useState(localStorage.getItem("password") || ""); //on regarde dans le local storage si mot de passe enregistré sinon nul
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");//on regarde dans le local storage si true pour Remember sinon false
    const [errorLoginMessage, setErrorLoginMessage] = useState(false); //message d'erreur 

    const dispatch = useDispatch(); // fonction pour envoyer action au store redux
    const navigate = useNavigate(); 


    //fonction pour la soumission du formulaire de connexion 
    async function handleSubmit(e) {
        e.preventDefault(); //empèche rechargement de la page

        try {
            const response = await fetchLogin({
                email: email,
                password: password,
            }); //appel de la fonction fetchLogin avec les infos utilisateur

            if (response.status === 200) { //la connexion est ok 
                dispatch(setLogin(true));  //passage de l'état de connexion à true 
                dispatch(setToken(response.body.token)); //enregistrement du token 
                const profile = await userProfile(response.body.token); //appel de la fonction userProfile 
                const data = await profile.body; //récupération des données utilisateur 
                dispatch(setUser(data)); //enregistrement des données utilisateurs dans le store avec l'action setUser
                navigate("/user"); //chargement de la page user 

                if (rememberMe) { //si case rememberMe coché on stocke l'email et le mdp dans le localStorage et on passe l'état de rememberMe à true
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("email"); //sinon on supprime l'email et et le mdp et on passe l'état de rememberMe à false
                    localStorage.removeItem("password");
                    localStorage.setItem("rememberMe", "false");
                }
            }

            if (response.status === 400) { //si connexion passe l'etat de errorLoginMessage à true et on recharge la page 
                setErrorLoginMessage(true);
                navigate("/sign-in");
            }
        } catch (error) {
            console.log(error);
        }
    }

    let errorMessage = null;
    if (errorLoginMessage) { //si l'etat de errorLoginMessage est true, on affiche un message d'erreur sous le formulaire
        errorMessage = <p style={{ color: "red" }}>Error in Email or password! Please try again</p>;
    }


    return (
        <main className="main bg-dark">
            <section className="signIn">
                <FontAwesomeIcon icon={faCircleUser} className='signIn__icon'/>
                <h1>Sign In</h1>
                {/* à la validation du form on appel la fonction handleSubmit  */}
                <form onSubmit={handleSubmit}> 
                    <div className="signIn__inputWrapper">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="signIn__inputWrapper">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="signIn__inputRemember">
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                        />
                        <label htmlFor="remember-me">Remember me</label>
                    </div>
                    <button type="submit" className="signIn__button">
                        Sign in
                    </button>
                    {errorMessage}
                </form>
            </section>
        </main>
    )
}
 
export default SignIn