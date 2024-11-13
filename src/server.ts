import express from 'express'
import router from './router'
import db from './config/db'

// Connecting to database
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        console.log('The connection to the database was success!')
        
    } catch (error) {
        console.log(error)
        console.log("There was an error in the database connection!")
    }
}

connectDB()

const server = express()

server.use('/api/products', router)

export default server