const Button = ({ text, className, onClick, id }) => {
    return (
        <button className={ className } onClick={onClick} id={id}>
            { text }
        </button>
    )
}

export default Button
