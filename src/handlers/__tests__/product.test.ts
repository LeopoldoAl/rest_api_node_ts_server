import Request from "supertest"
import server from "../../server"

describe('POST /api/products', () => {
    it('It should dislay errors validation', async () => {
        const response = await Request(server).post('/api/products').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    }, 60000)

    it('It should validate that the price is greater than zero', async () => {
        const response = await Request(server).post('/api/products').send({
            name: 'Curve Monitor',
            price: 0
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    }, 60000)

    it('It should validate that the price is a number and greater than zero', async () => {
        const response = await Request(server).post('/api/products').send({
            name: 'Curve Monitor',
            price: 'hello'
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(4)
    }, 60000)

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

describe('GET /api/products', () => {
    test('It gets a JSON response with products', async () => {
        const response = await Request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        
        expect(response.body.data).toHaveLength(1)
        expect(response.status).not.toBe(404)
    }, 600000)
})