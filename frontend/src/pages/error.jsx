import { NavLink } from "react-router-dom";

function Error() {
    return (
        <main>
            <section className="error bg-dark">
                <h1 className="error__title">404</h1>
                <p className="error__text">Sorry, we couldn't find this page.</p>
                <NavLink to="/">
                    <button className="error__button">Back to Homepage</button>
                </NavLink>
            </section>
        </main>
    )
}
 
export default Error