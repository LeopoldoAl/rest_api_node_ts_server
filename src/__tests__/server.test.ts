import Request from "supertest"
import server from "../server"

describe('Get /api', () => {
    it('It should send back a json response', async () => {
        const res = await Request(server).get('/api')
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch((/json/))
        expect(res.body.msg).toBe('From API')
    })
})