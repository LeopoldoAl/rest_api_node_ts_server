import Request from "supertest"
import server, { connectDB } from "../server"
import db from "../config/db"

describe('Get /api', () => {
    it('It should send back a json response', async () => {
        const res = await Request(server).get('/api')
        expect(res.body.msg).toBe('From API')
        expect(res.headers['content-type']).toMatch((/json/))
        
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('from api')

    }, 60000)
})

jest.mock("../config/db")

describe('connectDB', () => {
    it('It should handle database connection error', async () => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error("There was an error in the database connection!") )
        const consoleSpy = jest.spyOn(console, 'log')
        await connectDB()
        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining("There was an error in the database connection!")
        )
    }, 60000)
})