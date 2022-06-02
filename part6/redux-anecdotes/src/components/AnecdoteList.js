import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import {  initializeAnecdotes, updateVotes } from "../reducers/anecdoteReducer"
import { addNotification} from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [dispatch])

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

  const vote = (anecdote) => {
      dispatch(updateVotes(anecdote))
      dispatch(addNotification(`you voted '${anecdote.content}'`, 5))
  }

  return (
    <div>
        <div>
            {anecdote.content}
        </div>
        <div>
            has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
        </div>
   </div>
  )
}

export default AnecdoteList