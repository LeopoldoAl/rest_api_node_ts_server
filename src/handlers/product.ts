import { Request, Response } from "express"
import  {check, validationResult} from 'express-validator'
import Product from "../models/Product.model"


export const createProduct = async (req: Request, res: Response) => {
    // Validation
    await check('name').notEmpty()
            .withMessage('The product name can not be empty!')
            .run(req)
            
    await check('price')
            .isNumeric().withMessage("Value is not valid!")
            .notEmpty().withMessage('The product price can not be empty!')
            .custom(value => value>0).withMessage('Value is not valid!')
            .run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()})
        return 
    }

    const product = await Product.create(req.body)
    res.json({data: product})
}