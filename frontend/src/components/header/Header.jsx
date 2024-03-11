import Logo from '../../assets/img/argentBankLogo.webp';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setToken, setUser } from "../../redux/actions/user.action";

function Header() {

    const isLogged = useSelector((state) => state.user.isLogin);  //on récupère l'état de isLogin dans le store
    const userName = useSelector((state) => state.user.dataUser.userName); //on récupère le username dans le store

    let logOption = null; //on initialise une variable à nul pour le contenu de droite du  header 

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(setLogin(false));  //on passe isLogin à false avec l'action setLogin
        dispatch(setToken(null)); //on efface le token avec l'action setToken
        dispatch(setUser("")); //on efface les données utilisateurs avec l'action setUser
        navigate("/"); //on retourne à la page d'accueil
    };

    if (isLogged === false) { //si pas connecté
        logOption = ( //le contenu du est : 
            <NavLink to="/sign-in" className="nav__item">
                <FontAwesomeIcon icon={faCircleUser} />
                Sign In
            </NavLink>
        );
    }

    if (isLogged === true) { //si connecté 
        logOption = ( //le contenu est : 
            <div>
                <NavLink to="/sign-in" className="nav__item">
                <FontAwesomeIcon icon={faCircleUser} />
                {userName}
                </NavLink>
                <NavLink to="/">
                    <button className="nav__item--logout" onClick={logout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Logout
                    </button>
                </NavLink>
            </div>
        );
    }
    return (
        <header>
            <nav className="nav">
                <NavLink to="/" className="nav__logo">
                    <img
                        className="nav__logo--image"
                        src={Logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                {/* contenu du header en fonction du statut de connexion */}
                {logOption} 
            </nav>
      </header>
    )
}

export default Header