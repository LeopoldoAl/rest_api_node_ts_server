import { Router } from "express"
import  {body, param} from 'express-validator'
import { createProduct, getProductById, getProducts, updateProduct } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
// routing
router.get('/', getProducts)
router.get('/:id', 
    param('id').isInt().withMessage("ID isn't valid!"),
    handleInputErrors,
    getProductById
)

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

router.put('/:id', 
    body('name').notEmpty()
            .withMessage('The product name can not be empty!'),
            
    body('price')
            .isNumeric().withMessage("Value is not valid!")
            .notEmpty().withMessage('The product price can not be empty!')
            .custom(value => value>0).withMessage('Value is not valid!'),

    body('availability').isBoolean().withMessage('availability value is not valid!'),

    handleInputErrors,
    
    updateProduct)

router.patch('/', (req, res) => {
    res.json('From PATCH')
})

router.delete('/', (req, res) => {
    res.json('From DELETE')
})

export default router