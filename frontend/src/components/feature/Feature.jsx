function Feature({image,title,txt}) {
    return (
        <div class="feature">
                <img src={image} alt={`${title} Icon`} className="feature__icon" />
                <h3 className="feature__title">{title}</h3>
                <p>{txt}</p>
        </div>
    )
}
 
export default Feature