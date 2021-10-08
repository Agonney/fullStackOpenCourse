import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import numbersService from './services/numbersService'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    numbersService
        .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

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

    numbersService.create(person)
                  .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                  })
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

  const deletePerson = (id) => {
    const filteredPerson = persons.filter(person => person.id === id)
    const personName = filteredPerson[0].name
    const personId = filteredPerson[0].id
    if (window.confirm(`Delete ${personName} ?`)) {
      numbersService
        .deletePerson(personId)
      console.log(`${personName} successfully deleted`)
      setPersons(persons.filter(person => person.id !== personId))
    }
  }

  const showRows = () => numbersToShow.map(person => 
        <li key={person.id}>
          {person.name} {person.number} 
          <button onClick={deletePerson(person.id)}>delete</button>
        </li>
        )

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