import PropTypes from "prop-types";
import { useState } from "react";
import { userEditProfile } from "../../requests/user.api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/user.action";

export default function EditName({ setEdit }) {
    const [username, getUsernameChange] = useState(""); //initialisation du state de username à ""

    const dispatch = useDispatch();

    //on récupère les infos dans le store redux
    const token = useSelector((state) => state.user.token);
    const userName = useSelector((state) => state.user.dataUser.userName);
    const firstName = useSelector((state) => state.user.dataUser.firstName);
    const lastName = useSelector((state) => state.user.dataUser.lastName);

    //fonction pour la soumission du formulaire d'édition
    async function onSave(e) {
        e.preventDefault();
        try {
            const response = await userEditProfile(token, username); //appel de la fonction userEditProfile avec le token de sécurité et le nouveau username
            if (response.status === 200) { //si ok 
                dispatch(setUser(response.body)); //on change le userName dans le store avec l'action setUser
                setEdit(false); //on repasse l'état de setEdit à false pour fermer le formulaire d'édition
            }
        } catch (error) {
            console.log(error);
        }
    }
    //fonction pour fermer le formulaire d'édition
    function cancel(e) {
        e.preventDefault();
        setEdit(false);
    }

    return (
        <form className="formEditName">
            <h2>Edit user info</h2>
            <div className="formEditName__input">
                <label htmlFor="username">User name :</label>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => getUsernameChange(e.target.value)}
                    required
                    placeholder={userName}
                />
            </div>
            <div className="formEditName__input">
                <label htmlFor="firstname">First name :</label>
                <input type="text" id="firstname" disabled placeholder={firstName} />
            </div>
            <div className="formEditName__input">
                <label htmlFor="lastname">Last name :</label>
                <input type="text" id="lastname" disabled placeholder={lastName} />
            </div>
            <div className="formEditName__buttons">
                <button onClick={onSave}>Save</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </form>
    );
}

EditName.propTypes = {
    setEdit: PropTypes.func.isRequired,
};