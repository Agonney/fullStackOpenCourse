import { addAnecdote } from "../reducers/anecdoteReducer"
import { addNotification } from "../reducers/notificationReducer"
import { connect } from "react-redux"

const AnecdoteForm = (props) => {
    const handleSubmit = async (event) => {
        event.preventDefault()
        const anecdoteText = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.addAnecdote(anecdoteText)
        props.addNotification(`you created anecdote:  '${anecdoteText}'`, 5)
    }

    return(
        <div>
          <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default connect(null, { addAnecdote, addNotification }) (AnecdoteForm)