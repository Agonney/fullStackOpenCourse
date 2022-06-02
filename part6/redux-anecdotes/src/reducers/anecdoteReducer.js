import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action){
      const newAnecdote = action.payload
      state.push(newAnecdote)
    },
    addVote(state, action){
      const updatedAnecdote = action.payload
      return state.map(anecdote => anecdote.id !== action.payload.id ? anecdote : updatedAnecdote)
    },
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const { createAnecdote, addVote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const updateVotes = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdote)
    dispatch(addVote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer