import React, { useState } from 'react'

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

const Person = ({person}) => <p key={person.name}>{person.name} {person.phone}</p>

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    if (persons.find((person) => person.name === newName)) {
      window.alert(`${newName} is already added to the phonebook`)
    } else {
      var newPerson = {
        name: newName,
        phone: newPhone
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