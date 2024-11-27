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
    it('It should chack if api/products url exists', async () => {
        const response = await Request(server).get('/api/products')
        expect(response.status).not.toBe(404)
    }, 60000)

    test('It gets a JSON response with products', async () => {
        const response = await Request(server).get('/api/products')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveLength(1)
        
        expect(response.body.data).toHaveLength(1)
    }, 60000)
})

describe('GET /api/products/:id', () => {
    it('It should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await Request(server).get(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("Product is not found!")

    },60000)

    it('It should check a valid ID in the URL', async () => {
        const response = await Request(server).get('/api/products/not-valid-url')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID isn't valid!")

    },60000)

    it('It gets a JSON response for a  single product', async () => {
        const response = await Request(server).get('/api/products/1')
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')

    },60000)

})

describe('PUT /api/products/:id', () => {
    
    it('It should check a valid ID in the URL', async () => {
        const response = await Request(server).put('/api/products/not-valid-url').send({
            name: "Curve Monitor",
            availability: true,
            price: 300
        })
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID isn't valid!")

    },60000)

    it('It should display validation error messages when updating a product', async () => {
        const response = await Request(server).put('/api/products/1').send({})
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(5)

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    }, 60000)

    
    it('It should validate that the price is greater than zero', async () => {
        const response = await Request(server)
                                .put('/api/products/1')
                                .send({
                                    name: "Curve Monitor",
                                    availability: true,
                                    price: -300
                                })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toBeTruthy()
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("Value is not valid!")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    }, 60000)
    
    it('It should return a 404 response for a non-existense product', async () => {
        const productId = 2000
        const response = await Request(server)
                                .put(`/api/products/${productId}`)
                                .send({
                                    name: "Curve Monitor",
                                    availability: true,
                                    price: 300
                                })

        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Product is not found!")
        

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    }, 60000)
    
    it('It should update an existent product with valid data', async () => {
        const response = await Request(server)
                                .put(`/api/products/1`)
                                .send({
                                    name: "Curve Monitor",
                                    availability: true,
                                    price: 300
                                })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        

        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty('errors')
    }, 60000)
    

})

describe('PATCH /api/products/:id', () => {
    it('It should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await Request(server).patch(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Product is not found!")
        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty("data")
    }, 60000)
    it('It should update the product avalability', async () => {
        const response = await Request(server).patch(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty("data")
        expect(response.body.data.availability).toBe(false)

        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
        expect(response.body).not.toHaveProperty("error")
    }, 60000)
})
describe('DELETE /api/products/:id', () => {
    it('It should valid ID', async () => {
        const response = await Request(server).delete('/api/products/not-valid')
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toBe("ID isn't valid!")

    }, 60000)

    it('It should return a 404 response for a non-existent product', async () => {
        const productId = 2000
        const response = await Request(server).delete(`/api/products/${productId}`)
        expect(response.status).toBe(404)
        expect(response.body.error).toBe("Product is not found!")
        expect(response.status).not.toBe(200)
    }, 60000)

    it('It should delete a product', async () => {
        const response = await Request(server).delete(`/api/products/1`)
        expect(response.status).toBe(200)
        expect(response.body.data).toBe("Product deleted!")
        expect(response.status).not.toBe(404)
        expect(response.status).not.toBe(400)
    }, 60000)
})