import Logo from '../../assets/img/argentBankLogo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setToken, setUser } from "../../redux/actions/user.action";

function Header() {

    const isLogged = useSelector((state) => state.user.isLogin);
    const userName = useSelector((state) => state.user.dataUser.userName);

    let logOption = null;

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logout = () => {
        dispatch(setLogin(false));
        dispatch(setToken(null));
        dispatch(setUser(""));
        navigate("/");
    };

    if (isLogged === false) {
        logOption = (
            <NavLink to="/sign-in" className="main-nav-item">
                <FontAwesomeIcon icon={faCircleUser} />
                Sign In
            </NavLink>
        );
    }

    if (isLogged === true) {
        logOption = (
            <div>
                <NavLink to="/sign-in" className="main-nav-item">
                <FontAwesomeIcon icon={faCircleUser} />
                    <span className="main-nav-name">{userName}</span>
                </NavLink>
                <NavLink to="/">
                    <button className="main-nav-item btn-logout" onClick={logout}>
                        <FontAwesomeIcon icon={faRightFromBracket} />
                        Logout
                    </button>
                </NavLink>
            </div>
        );
    }
    return (
        <header>
            <nav className="main-nav">
                <NavLink to="/" className="main-nav-logo">
                    <img
                        className="main-nav-logo-image"
                        src={Logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </NavLink>
                {logOption}
            </nav>
      </header>
    )
}

export default Header