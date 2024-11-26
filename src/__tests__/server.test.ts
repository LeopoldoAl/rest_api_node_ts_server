import { connectDB } from "../server"
import db from "../config/db"

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