import Contact from "./Contact"

const ContactDisplay = ({showContact, deleteContact}) => {
    return (
        showContact.map(person => <Contact key={person.id} person={person} deleteContact={deleteContact} />)
    )
}

export default ContactDisplay;