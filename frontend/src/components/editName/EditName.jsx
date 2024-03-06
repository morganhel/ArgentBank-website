import PropTypes from "prop-types";
import { useState } from "react";
import { userEditProfile } from "../../requests/user.api";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions/user.action";

export default function EditName({ setEdit }) {
    const [username, getUsernameChange] = useState("");

    const dispatch = useDispatch();

    const token = useSelector((state) => state.user.token);
    const userName = useSelector((state) => state.user.dataUser.userName);
    const firstName = useSelector((state) => state.user.dataUser.firstName);
    const lastName = useSelector((state) => state.user.dataUser.lastName);

    async function onSave(e) {
        e.preventDefault();
        try {
            const response = await userEditProfile(token, username);
            console.log(response);
            if (response.status === 200) {
                dispatch(setUser(response.body));
                setEdit(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    function cancel(e) {
        e.preventDefault();
        setEdit(false);
    }

    return (
        <form className="form-edit">
            <h2>Edit user info</h2>
            <div className="input-edit">
                <label htmlFor="username">User name :</label>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => getUsernameChange(e.target.value)}
                    required
                    placeholder={userName}
                />
            </div>
            <div className="input-edit">
                <label htmlFor="firstname">First name :</label>
                <input type="text" id="firstname" disabled placeholder={firstName} />
            </div>
            <div className="input-edit">
                <label htmlFor="lastname">Last name :</label>
                <input type="text" id="lastname" disabled placeholder={lastName} />
            </div>
            <div className="btn-edit">
                <button onClick={onSave}>Save</button>
                <button onClick={cancel}>Cancel</button>
            </div>
        </form>
    );
}

EditName.propTypes = {
    setEdit: PropTypes.func.isRequired,
};