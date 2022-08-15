const ContactForm = (props) => {
    return (
        <>
        <form onSubmit={props.onSubmit}>
            <div>
                name: <input value={props.newName} onChange={props.handleNewName} />
            </div>
            <div>
                number: <input value={props.newNumber} onChange={props.handleNewNumber} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
        </>
    )
}

export default ContactForm;
