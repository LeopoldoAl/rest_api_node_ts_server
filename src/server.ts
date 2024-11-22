import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'

// Connecting to database
async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta.bold('The connection to the database was success!'))
        
    } catch (error) {
        // console.log(error)
        //console.log(colors.red.bold.bold("There was an error in the database connection!"))
    }
}

connectDB()

// Express instance
const server = express()

// Reading data from the FORM
server.use(express.json())

server.use('/api/products', router)

server.get('/api', (req, res) => {
    res.json({msg: 'From API'})
})

export default server