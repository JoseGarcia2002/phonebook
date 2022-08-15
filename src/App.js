import {useState, useEffect} from "react"

import ContactForm from "./components/ContactForm"
import Filter from "./components/Filter"
import ContactDisplay from "./components/ContactDisplay"
import Notification from "./components/Notification"

import axios from 'axios'
import personServices from "./services/persons"

function App() {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [errorMessage, setErrorMessage] = useState(null)
  const [messageSuccess, setMessageSuccess] = useState(true)

  const [filter, setFilter] = useState("")

  useEffect(() => {
    personServices
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })

  }, [])

  const handleNewName = (event) => {
    setNewName(event.target.value)
    console.log(newName)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
    console.log(newNumber)
  }

  const addNewContact = (event) => {
    event.preventDefault()
    var isRepeat = false
    
    persons.forEach(person => {
      if (person.name === newName) {
        isRepeat = true
      }
    })

    if (!isRepeat) {
      const newPerson = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }
      personServices
        .create(newPerson)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setMessageSuccess(true)
          setErrorMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
    }
    else {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const personToUpdate = persons.find(person => person.name === newName)
        const updatedPerson = {...personToUpdate, number: newNumber}
        personServices
          .update(personToUpdate.id, updatedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => (person.id !== returnedPerson.id) ? person : returnedPerson))
          })
          .catch(error => {
            setMessageSuccess(false)
            setErrorMessage(`Information of ${updatedPerson.name} has already been removed`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 3000)
          })

      }
    }
  }

  const deleteContact = (id) => {
    console.log(id)
    const contactToDelete = persons.find(contact => contact.id === id)
    console.log(contactToDelete)
    const newPersons = persons.filter(contact => contact !== contactToDelete)
    console.log(newPersons)

    personServices
      .remove(id)
      .then(() => {
        setPersons(newPersons)
      })
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const showContact = filter 
    ? persons.filter(person => person.name.includes(filter))
    : persons

  return (
    <div>
      <Notification message={errorMessage} success={messageSuccess}/>
      <h2>Filter</h2>
      <Filter filter={filter} handleFilter={handleFilter}/>
      <h2>Phonebook </h2>
      <ContactForm onSubmit={addNewContact} newName={newName} 
      newNumber={newNumber} handleNewName={handleNewName} 
      handleNewNumber={handleNewNumber} />
      <h2>Numbers</h2>
      <ContactDisplay showContact={showContact} deleteContact={deleteContact}/>
    </div>
  )
}

export default App;
