import { Router } from "express"
import { body, param } from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
/**
 * @swagger
 * components:
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: The Product ID
 *                      example: 1
 *                  name:
 *                      type: string
 *                      description: The Product name
 *                      example: Curve Monitor with 49 inches
 *                  price:
 *                      type: number
 *                      description: The Product price
 *                      example: 300
 *                  availability:
 *                      type: bolean
 *                      description: The Product availability
 *                      example: true
*/

/**
 * @swagger
 * /api/products:
 *      get:
 *          summary: Get a products list
 *          tags:
 *              - Products
 *          description: Return a list of products
 *          responses:
 *              200:
 *                  description: Successful response
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Product'
 * 
 */

// routing
router.get('/', getProducts)

/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Get a product by ID
 *      tags: 
 *          - Products
 *      description: Return a product based on its unique ID
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product ID to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Successful Response
 *              content: 
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Not Found
 *          400:
 *              description: Bad Request - Invalid ID
 * 
 */
router.get('/:id', 
    param('id').isInt().withMessage("ID isn't valid!"),
    handleInputErrors,
    getProductById
)

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Creates a new product
 *      tags:
 *          - Products
 *      description: Returns a new record in the database
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Curve Monitor"
 *                          price:
 *                              type: number
 *                              example: 300
 *      responses:
 *          201:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      shema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid input dsta
 *                 
 */
router.post('/', 
    // Validation
    body('name').notEmpty()
            .withMessage('The product name can not be empty!'),
            
    body('price')
            .isNumeric().withMessage("Value is not valid!")
            .notEmpty().withMessage('The product price can not be empty!')
            .custom(value => value>0).withMessage('Value is not valid!'),
    
    handleInputErrors,
    
    createProduct)


/**
 * @swagger
 *  /api/products/{id}:
 *  put:
 *      summary: Updating a product with user input
 *      tags:
 *          - Products
 *      description: Returns the updated product
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The product ID to retrieve
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody: 
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Curve Monitor"
 *                          price:
 *                              type: number
 *                              example: 300
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Successful Response
 *              content:
 *                  application/json:
 *                      shema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Invalid ID or Invalid input data
 *          404:
 *              description: Product Not Found
 */
router.put('/:id', 
    param('id').isInt().withMessage("ID isn't valid!"),
    body('name').notEmpty()
            .withMessage('The product name can not be empty!'),
            
    body('price')
            .isNumeric().withMessage("Value is not valid!")
            .notEmpty().withMessage('The product price can not be empty!')
            .custom(value => value>0).withMessage('Value is not valid!'),

    body('availability').isBoolean().withMessage('availability value is not valid!'),

    handleInputErrors,

    updateProduct)


/**
 * @swagger
 *  /api/products/{id}:
 *      patch:
 *          summary: Updating Product availability
 *          tags:
 *              - Products
 *          description: Returns the updated availability
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The product ID to retrieve
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Successful Response
 *                  content:
 *                      application/json:
 *                          shema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found    
 *  
 */
router.patch('/:id', 
    param('id').isInt().withMessage("ID isn't valid!"),
    handleInputErrors,
    updateAvailability)


/**
 * @swagger
 *  /api/products/{id}:
 *      delete:
 *          summary: Removing a product
 *          tags:
 *              - Products
 *          description: Returns a confirmation message
 *          parameters:
 *            - in: path
 *              name: id
 *              description: The product ID to delete
 *              required: true
 *              schema:
 *                  type: integer
 *          responses:
 *              200:
 *                  description: Product removed successfully!
 *                  content:
 *                      application/json:
 *                          shema:
 *                              type: string
 *                              value: "Product has been deleted!"
 *              400:
 *                  description: Bad Request - Invalid ID
 *              404:
 *                  description: Product Not Found    
 * 
 */
router.delete('/:id', 
    param('id').isInt().withMessage("ID isn't valid!"),
    handleInputErrors,
    deleteProduct
)

export default router