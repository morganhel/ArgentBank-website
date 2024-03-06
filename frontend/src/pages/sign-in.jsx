import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { fetchLogin, userProfile } from "../requests/user.api";
import { useDispatch } from "react-redux";
import { setLogin, setToken, setUser } from "../redux/actions/user.action";
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [password, setPassword] = useState(localStorage.getItem("password") || "");
    const [rememberMe, setRememberMe] = useState(localStorage.getItem("rememberMe") === "true");
    const [errorLoginMessage, setErrorLoginMessage] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const response = await fetchLogin({
                email: email,
                password: password,
            });

            if (response.status === 200) {
                dispatch(setLogin(true));
                dispatch(setToken(response.body.token));
                const profile = await userProfile(response.body.token);
                const data = await profile.body;
                dispatch(setUser(data));
                navigate("/user");
                console.log(data);
                console.log(response.body.token);

                if (rememberMe) {
                    localStorage.setItem("email", email);
                    localStorage.setItem("password", password);
                    localStorage.setItem("rememberMe", "true");
                } else {
                    localStorage.removeItem("email");
                    localStorage.removeItem("password");
                    localStorage.setItem("rememberMe", "false");
                }
            }

            if (response.status === 400) {
                setErrorLoginMessage(true);
                navigate("/sign-in");
            }
        } catch (error) {
            console.log(error);
        }
    }

    let errorMessage = null;
    if (errorLoginMessage) {
        errorMessage = <p style={{ color: "red" }}>Error in Email or password! Please try again</p>;
    }


    return (
        <main className="main bg-dark">
            <section className="sign-in-content">
                <FontAwesomeIcon icon={faCircleUser} />
                <h1>Sign In</h1>
                <form onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </div>
            <div className="input-wrapper">
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </div>
            <div className="input-remember">
                <input
                    type="checkbox"
                    id="remember-me"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
            </div>
            <button type="submit" className="sign-in-button">
                Sign in
            </button>
            {errorMessage}
        </form>
            </section>
        </main>
    )
}
 
export default SignIn