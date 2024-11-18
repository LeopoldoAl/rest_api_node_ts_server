import { Router } from "express"
import  {body} from 'express-validator'
import { createProduct, getProducts } from "./handlers/product"
import { handleInputErrors } from "./middleware"

const router = Router()
// routing
router.get('/', getProducts)

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

router.put('/', (req, res) => {
    res.json('From PUT')
})

router.patch('/', (req, res) => {
    res.json('From PATCH')
})

router.delete('/', (req, res) => {
    res.json('From DELETE')
})

export default router