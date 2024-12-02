import express from 'express'
import router from './router'
import db from './config/db'
import colors from 'colors'
import swaggerUI from 'swagger-ui-express'
import swaggerSpec, { swaggerUIOptions } from './config/swagger'
import path from 'path'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'

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

// Allowing connexions
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if (origin===process.env.FRONTEND_URL) {
            callback(null, true)
        } else {
            callback(new Error('CORS errors!'))   
        }
        
    }
}

server.use(cors(corsOptions))

// Reading data from the FORM
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router)

// STATIC FILES
server.use(express.static(path.join(__dirname, "../public")))
server.use("/media", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/media/logo.png"))
})

// Documenting
server.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, swaggerUIOptions))

export default server