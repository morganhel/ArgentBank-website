import Feature from '../components/feature/Feature'
import IconChat from '../assets/img/icon-chat.png'
import IconMoney from '../assets/img/icon-money.png'
import IconSecurity from '../assets/img/icon-security.png'
import '../index.css'

function Home() {
    return (
        <main>
        <div className="hero">
            <section className="hero-content">
                <h2 className="sr-only">Promoted Content</h2>
                <p className="hero-content__subtitle">No fees.</p>
                <p className="hero-content__subtitle">No minimum deposit.</p>
                <p className="hero-content__subtitle">High interest rates.</p>
                <p className="hero-content__text">Open a savings account with Argent Bank today!</p>
            </section>
        </div>
        <section className="features">
            <h2 className="sr-only">Features</h2>
            <Feature 
                image={IconChat} 
                title="You are our #1 priority" 
                txt="Need to talk to a representative? You can get in touch through our
                24/7 chat or through a phone call in less than 5 minutes."
            />
            <Feature 
                image={IconMoney}
                title="More savings means higher rates" 
                txt="The more you save with us, the higher your interest rate will be!"
            />
            <Feature 
                image={IconSecurity}
                title="Security you can trust" 
                txt="We use top of the line encryption to make sure your data and money
                is always safe."
            />
        </section>
    </main>
    )
}
 
export default Home