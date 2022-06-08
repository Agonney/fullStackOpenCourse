import express from 'express'
const cors = require('cors')
const app = express()
app.use(express.json())
app.use(cors())

const PORT = 3001

app.get('/api/ping', (_request, response) => {
    return response.send('pong')
})

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
})


