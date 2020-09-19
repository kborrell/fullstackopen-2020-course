import React, { useEffect, useState } from 'react'
import axios from 'axios'

const PersonFilter = ({nameFilter, onFilterChanged}) => <div>filter shown with <input value={nameFilter} onChange={onFilterChanged} /></div>

const PersonForm = ({onSubmit, name, phone, onNameChanged, onPhoneChanged}) =>
  <div>
    <form onSubmit={onSubmit}>
      <div>name: <input value={name} onChange={onNameChanged} /></div>
      <div>phone: <input value={phone} onChange={onPhoneChanged} /></div>
      <div><button type="submit">add</button></div>
    </form>
  </div>

const Persons = ({persons, nameFilter}) => {
  let filteredPersons = nameFilter ? persons.filter((person) => person.name.includes(nameFilter)) : persons
  return (
    <div>{filteredPersons.map((person) => <Person key={person.name} person={person} />)}</div>
  )
}

const Person = ({person}) => <p key={person.name}>{person.name} {person.number}</p>

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      var newPerson = {
        name: newName,
        number: newPhone
      }
      let newPersons = persons.concat(newPerson)
      setPersons(newPersons)
      setNewName('')
      setNewPhone('')
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
      <Persons persons={persons} nameFilter={nameFilter}/>
    </div>
  )
}

export default App