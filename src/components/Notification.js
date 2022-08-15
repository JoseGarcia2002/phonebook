import "../index.css"

const Notification = ({message, success}) => {
    if (message === null) {
        return null 
    }
    
    const classes = `notification ${success ? "success" : "error"}`

    return (
        <div className={classes}>
            {message}
        </div>
    )
}

export default Notification;