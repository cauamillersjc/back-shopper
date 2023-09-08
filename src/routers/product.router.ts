import { Router } from "express"
import { ProductService } from "../services/product.service"
import { PackService } from "../services/pack.service"
import { ProductModel } from "../models/product"

export const productRouter = Router()

export interface IUpdate {
    product_code: number,
    new_price: number,
}

const productService = new ProductService()
const packService = new PackService()

productRouter.get('/', async (req, res) => {
    try {
        const products = await productService.getAllProducts()
        return res.json(products)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }
})

productRouter.post('/validate', async (req, res) => {
    try {
        const productsToValidate: IUpdate[] = req.body
        const validatedProducts = []

        await Promise.all(
            productsToValidate.map(async (product) => {
                // Valida se o código é de um pack
                const pack = await packService.getPackByProductCode(product.product_code)
                if (pack) {
                    const validatedPack = await packService.validatePackUpdate(pack, product, productsToValidate)
                    validatedProducts.push(validatedPack)
                }
                else {
                    const validatedProduct = await productService.validateUpdate(product.product_code, product.new_price)
                    validatedProducts.push(validatedProduct)
                }
            })
        )

        res.status(200).json(validatedProducts)
    }
    catch (error) {
        res.status(500).json({ erro: error.message })
    }
})

productRouter.patch('/multiple-update', async (req, res) => {
    try {
        const productsToUpdate: IUpdate[] = req.body
        const updatedProducts = []
        const validatedProducts = []

        await Promise.all(
            productsToUpdate.map(async (product) => {
                // Valida se o código é de um pack
                const pack = await packService.getPackByProductCode(product.product_code)
                if (pack) {
                    const validatedPack = await packService.validatePackUpdate(pack, product, productsToUpdate)
                    validatedProducts.push(validatedPack)
                }
                else {
                    const validatedProduct = await productService.validateUpdate(product.product_code, product.new_price)
                    validatedProducts.push(validatedProduct)
                }
            })
        )

        let canUpdate = true

        validatedProducts.map(product => {
            if (product?.message !== '') {
                canUpdate = false
            }
        })

        if (!canUpdate) {
            res.status(400).json(validatedProducts)
        }
        else{
            await Promise.all(
                productsToUpdate.map(async (product) => {
                    const { product_code, new_price } = product
                    const updatedProduct = await productService.updatePrice(product_code, new_price)
                    updatedProducts.push(updatedProduct)
                })
            )
    
            console.log(updatedProducts)
    
            res.status(200).json(updatedProducts)
        }
    }
    catch (error) {
        res.status(500).json({ erro: error.message })
    }
})