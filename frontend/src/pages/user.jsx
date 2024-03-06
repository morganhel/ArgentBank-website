import { useState } from "react";
import { useSelector } from "react-redux";
import EditName from "../components/editName/EditName";
import Account from '../components/account/Account';
import transactions from "../assets/data/transactions.json";

function User() {
    const [edit, setEdit] = useState(false);
    const userName = useSelector((state) => state.user.dataUser.userName);

    return (
    <main className="main bg-dark">
        <div className="header">
            {edit ? (
                    <EditName setEdit={setEdit} />
                ) : (
                    <>
                        <h1>
                            Welcom back
                            <br />
                            {userName}!
                        </h1>
                        <button className="edit-button" onClick={() => setEdit(true)}>
                            Edit Name
                        </button>
                    </>
                )}
        </div>

        <h2 className="sr-only">Accounts</h2>
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
 
export default User