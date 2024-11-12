import express from 'express'

const server = express()

// routing
server.post('/', (req, res) => {
    const data = [
        {id: 1, name: 'Leo'},
        {id: 2, name: 'Jhon'},
    ]
    res.json(data)
})

export default server