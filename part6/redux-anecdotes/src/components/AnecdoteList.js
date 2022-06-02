import { useDispatch, useSelector } from "react-redux"
import { addVote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(({filter, anecdotes}) => {
    if(filter === '')
      return anecdotes.slice()
    const regex = new RegExp(filter, 'i')
    return anecdotes.filter(anecdote => anecdote.content.match(regex))
  })

  const byVotes = (a,b) => b.votes - a.votes

  return(
    <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort(byVotes).map(anecdote =>
          <Anecdote key={anecdote.id} anecdote={anecdote} />
        )}
    </div>
  )
}

const Anecdote = ( {anecdote} ) => {
  const dispatch = useDispatch()

  const vote = (id) => {
      dispatch(addVote(id))
      dispatch(setNotification(`you voted '${anecdote.content}'`))
      setTimeout(() => {
        dispatch(removeNotification())
      }, 5000)
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

export default AnecdoteList