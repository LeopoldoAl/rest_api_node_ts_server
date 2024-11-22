import {exit} from 'node:process'
import db from '../config/db'

const cleanDB = async () => {
    try {
        await db.sync({force: true})
        console.log('Data have been eliminated successfully')
        exit(0)
    } catch (error) {
        console.log(error)
        exit(1)
    }
}

if (process.argv[2] === '--clear') {
    cleanDB()
}

