import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from 'react-router-dom';
import EditName from "../components/editName/EditName";
import Account from '../components/account/Account';
import transactions from "../assets/data/transactions.json";

function User() {
    const [edit, setEdit] = useState(false); //constante pour afficher ou non la fenêtre d'édition du nom
    const userName = useSelector((state) => state.user.dataUser.userName); //recupération de username dans le store Redux 
    const isLogged = useSelector((state) => state.user.isLogin);

    if (isLogged===true){
        return (
        <main className="main bg-dark">
            <div className="user">
                {edit ? (
                        // si edit=true on affiche le formulaire d'édition 
                        <EditName setEdit={setEdit} />
                    ) : (
                        //sinon on affiche ce qui suit
                        <>
                            <h1>
                                Welcome back
                                <br />
                                {userName}!
                            </h1>
                            {/* au clique sur le bouton on ouvre le formulaire d'édition */}
                            <button className="user__button" onClick={() => setEdit(true)}>
                                Edit Name
                            </button>
                        </>
                    )}
            </div>

            <h2 className="sr-only">Accounts</h2>
            {/* on parcourt le fichier trasactions.json et pour chaque transaction on affiche le composant Account */}
            {transactions.map((transaction,index) => (
            <Account 
                key={index}
                title={transaction.title}
                amount={transaction.amount}
                description={transaction.description}
            />
            ))}
            </main>
        )
        }
        else{
            window.location.href ="/error";
        }
}
 
export default User