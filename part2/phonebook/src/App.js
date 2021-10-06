import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  const numbersToShow = filter === '' ? persons : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase())
    )

  const addNumber = (event) =>{
    event.preventDefault()
    console.log("name before adding ", newName)

    const person = {
      name: newName,
      number: newNumber,
      id: persons.length+1
    }

    const all_names = persons.map(person => person.name)

    if(all_names.includes(newName)){
      console.log("executed")
      alert(`${newName} is already added to phonebook`)
      return
    }

    console.log("Before adding to array",persons)
    setPersons(persons.concat(person))
    console.log("After adding to array",persons)
    }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
      setFilter(event.target.value)
  }

  const showRows = () => numbersToShow.map(person => <p key={person.id}>{person.name} {person.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter handleFilterChange={handleFilterChange} value={filter} />

      <h2>Add new</h2>

      <PersonForm 
          onSubmit={addNumber} 
          name={{value: newName, onChange: handleNameChange}} 
          number={{value: newNumber, onChange: handleNumberChange}}
      />

      <h2>Numbers</h2>

      <Persons showRows={showRows()} />
    </div>
  )
}

export default App