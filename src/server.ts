import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUIOptions } from './config/swagger'
import path from 'path'

// Connecting to database
export async function connectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta.bold('The connection to the database was success!'))
        
    } catch (error) {
        // console.log(error)
        console.log(colors.red.bold.bold("There was an error in the database connection!"))
    }
}

connectDB()

// Express instance
const server = express()

// Reading data from the FORM
server.use(express.json())

server.use('/api/products', router)

// STATIC FILES
server.use(express.static(path.join(__dirname, "../public")))
server.use("/media", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/media/logo.png"))
})

// Documenting
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server