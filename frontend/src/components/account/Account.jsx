function Header({title,amount,description}) {
    return (
        <section className="account">
            <div className="account__content">
                <h3 className="account__content--title">{title}</h3>
                <p className="account__content--amount">{amount}</p>
                <p className="account__content--description">{description}</p>
            </div>
            <div className="account__content cta">
                <button className="account__content--button">View transactions</button>
            </div>
    </section>
    )
}

export default Header