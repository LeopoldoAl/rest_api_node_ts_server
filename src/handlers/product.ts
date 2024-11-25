import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req: Request, res: Response) => {
    const products = await Product.findAll({
        order: [
            ['id', 'ASC']
        ]
    })
    res.json({data: products})
}

export const getProductById = async (req: Request, res: Response) => {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({
                error: 'Product is not found!'
            })
            return
        }
        res.json({data: product})
}


export const createProduct = async (req: Request, res: Response) => {
        const product = await Product.create(req.body)
        res.status(201).json({data: product})
}
export const updateProduct = async (req:Request, res:Response) => {
    const {id} = req.params
    const product = await Product.findByPk(id)
    if (!product) {
        res.status(404).json({
            error: 'Product is not found!'
        })
        return
    }
    // Updating
    await product.update(req.body)
    await product.save()
    res.json({data: product})
}
export const updateAvailability = async (req:Request, res:Response) => {
        try {
            const {id} = req.params
            const product = await Product.findByPk(id)
            if (!product) {
                res.status(400).json({
                    error: 'Product is not found!'
                })
            }

            // Updating
            product.availability = !product.dataValues.availability
            await product.save()

            res.json({data: product})

        } catch (error) {
            console.log(error);
            
        }
}

export const deleteProduct = async (req:Request, res:Response) => {
        const {id} = req.params
        const product = await Product.findByPk(id)
        if (!product) {
            res.status(404).json({
                error: 'Product is not found!'
            })
            return
        }
        await product.destroy()
        res.json({data: 'Product deleted!'})
}