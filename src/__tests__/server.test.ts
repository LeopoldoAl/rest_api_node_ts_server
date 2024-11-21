import Request from "supertest"
import server from "../server"

describe('Get /api', () => {
    it('It should send back a json response', async () => {
        const res = await Request(server).get('/api')
        expect(res.body.msg).toBe('From API')
        expect(res.headers['content-type']).toMatch((/json/))
        
        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('from api')

    })
})