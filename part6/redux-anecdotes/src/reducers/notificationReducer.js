import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification(state, action){
            const message = action.payload
            return state = message
        },
        removeNotification(state, action){
            return state = ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const addNotification =  (text, seconds) => {
    console.log(text, seconds)
    return async dispatch => {
        dispatch(setNotification(text))
        setTimeout(() => {
            dispatch(removeNotification())
        }, seconds * 1000)
    }
}

export default notificationSlice.reducer