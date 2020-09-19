import React, { useEffect, useState } from 'react'
import personsService from './services/persons'

const PersonFilter = ({nameFilter, onFilterChanged}) => <div>filter shown with <input value={nameFilter} onChange={onFilterChanged} /></div>

const PersonForm = ({onSubmit, name, phone, onNameChanged, onPhoneChanged}) =>
  <div>
    <form onSubmit={onSubmit}>
      <div>name: <input value={name} onChange={onNameChanged} /></div>
      <div>phone: <input value={phone} onChange={onPhoneChanged} /></div>
      <div><button type="submit">add</button></div>
    </form>
  </div>

const Persons = ({persons, nameFilter, onDeletePerson}) => {
  let filteredPersons = nameFilter ? persons.filter((person) => person.name.includes(nameFilter)) : persons
  return (
    <div>{filteredPersons.map((person) => <Person key={person.name} person={person} onDeletePerson={onDeletePerson} />)}</div>
  )
}

const Person = ({person, onDeletePerson}) => <p key={person.name}>{person.name} {person.number} <button onClick={() => onDeletePerson(person)}>delete</button></p>

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    personsService.getAll().then(allPersons => setPersons(allPersons))
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (newName.length > 0) {
      var existingPerson = persons.find((person) => person.name === newName)
      if (existingPerson) {
        if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`)) {
          var updatedPerson = {...existingPerson, number: newPhone}
          personsService
            .updatePerson(updatedPerson.id, updatedPerson)
            .then((newPerson) => {
              setPersons(persons.map((currentPerson) => currentPerson.id === newPerson.id ? newPerson : currentPerson))
              setNewName('')
              setNewPhone('')
            })
        } else {
          return;
        }
      } else {
        var newPerson = {
          name: newName,
          number: newPhone
        }
        personsService
          .addPerson(newPerson)
          .then((addedPerson) => {
            let newPersons = persons.concat(addedPerson)
            setPersons(newPersons)
            setNewName('')
            setNewPhone('')
          })
      }
    } else {
      window.alert("Name field can't be empty")
    }
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService
      .deletePerson(personToDelete.id)
      .then(() => setPersons(persons.filter((person) => person.id !== personToDelete.id)))
    }
  }

  const onNameChanged = (event) => setNewName(event.target.value)
  const onPhoneChanged = (event) => setNewPhone(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonFilter persons={persons} onFilterChanged={(event) => setNameFilter(event.target.value)}  />
      <h3>add a new</h3>
      <PersonForm onSubmit={addNewPerson} name={newName} phone={newPhone} onNameChanged={onNameChanged} onPhoneChanged={onPhoneChanged} />
      <h3>Phones</h3>
      <Persons persons={persons} nameFilter={nameFilter} onDeletePerson={(person) => deletePerson(person)}/>
    </div>
  )
}

export default App