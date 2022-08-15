const Contact = ({person, deleteContact}) => {
    return (
        <>
        <p>{person.name} {person.number}<button onClick={() => {deleteContact(person.id)}}>Delete</button></p>
        </>
    )
}

export default Contact;