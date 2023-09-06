import { Router } from "express"
import { matchedData } from "express-validator"
import { ProductService } from "../services/product.service"
import { ProductModel } from "../models/product"
import { validationResult } from 'express-validator'

export const productRouter = Router()
const productService = new ProductService()

productRouter.post('/', (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(422).json(errors.array())
        }

        const payload = matchedData(req) as ProductModel
        const product = productService.createProduct(payload)

        return product.then(p => res.json(p))
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

productRouter.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts()
        return res.json(products)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

productRouter.patch('/:code', async (req, res) => {
    const { code } = req.params
    const { sales_price } = req.body

    try {
        const validation = await productService.validateUpdate(Number(code), sales_price)
        if (!validation) {
            const product = await productService.updatePrice(Number(code), sales_price)
            res.status(200).json(product)
        }
        else {
            res.status(422).json({ error: validation })
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})