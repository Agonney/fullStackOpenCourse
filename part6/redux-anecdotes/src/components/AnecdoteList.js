import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.sort((a,b) => b.votes - a.votes))
  const dispatch = useDispatch()

  const Anecdote = ( {anecdote} ) => {
    const vote = (id) => {
        console.log('vote', id)
        dispatch(addVote(id))
    }

    return (
      <div>
          <div>
              {anecdote.content}
          </div>
          <div>
              has {anecdote.votes}
          <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
     </div>
    )
  }

  return(
    <div>
        <h2>Anecdotes</h2>
        {anecdotes.map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        )}
    </div>
  )
}

export default AnecdoteList