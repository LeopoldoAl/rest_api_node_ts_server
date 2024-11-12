import express from 'express'

const server = express()

// routing
server.get('/', (req, res) => {
    res.json('From GET')
})

server.post('/', (req, res) => {
    res.json('From POST')
})

server.put('/', (req, res) => {
    res.json('From PUT')
})

server.patch('/', (req, res) => {
    res.json('From PATCH')
})

server.delete('/', (req, res) => {
    res.json('From DELETE')
})

export default server