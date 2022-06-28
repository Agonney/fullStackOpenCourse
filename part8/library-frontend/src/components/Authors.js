import { useMutation, useQuery } from "@apollo/client"
import { useState } from "react"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import Select from "react-select"

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')
  const [ changeBirthyear ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}]
  })

  if (!props.show) {
    return null
  }
  
  if(result.loading){
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear( {variables: {name: name.value, setBornTo: parseInt(born)}})

    setName('')
    setBorn('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
          <Select
            defaultValue={name}
            onChange={setName}
            options={authors.map(author => ({value: author.name, label: author.name}))}
          />
          <div>
            born 
              <input 
                value={born}
                onChange={({ target }) => setBorn(target.value)}
              />
          </div>
          <button type="submit">update author</button>
        </form>
    </div>
  )
}

export default Authors
