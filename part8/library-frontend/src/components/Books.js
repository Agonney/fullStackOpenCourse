import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [genres, setGenres] = useState([])
  const [filteredBooks, setFilteredBooks] = useState([])
  const [selectedGenre, setSelectedGenre] = useState('')
  console.log(result)

  useEffect(() => {
    if(result.data){
      setBooks(result.data.allBooks)
      let allGenres = ['All genres']
      books.forEach(b => {
        b.genres.forEach(genre => {
          if(allGenres.indexOf(genre) === -1){
            allGenres.push(genre)
          }
        })
      })
      setGenres(allGenres)
      setSelectedGenre('All genres')
    }
    
  }, [result])

  useEffect(() => {
    if(selectedGenre === 'All genres'){
      setFilteredBooks(books)
    }else {
      setFilteredBooks(books.filter((book) => book.genres.indexOf(selectedGenre) !== -1))
    }
  }, [books, selectedGenre])


  console.log(genres)
  

  if (!props.show) {
    return null
  }

  if(result.loading){
    return <div>loading...</div>
  }


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>


      { genres.length > 0 &&
        genres.map((genre) => (
            <button key={genre} onClick={() => setSelectedGenre(genre)}>{genre}</button>
        ))
      }
      
    </div>
  )
}

export default Books
