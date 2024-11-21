import Request from "supertest"
import server from "../../server"

describe('POST /api/products', () => {
    it('It should create a new product', async () => {
        const response = await Request(server).post('/api/products').send({
            name: "Mouse - Testing",
            price: 50
        })

        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')

        expect(response.status).not.toBe(400)
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('errors')
    }, 120000)
})