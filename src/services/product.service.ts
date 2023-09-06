import * as Bluebird from 'bluebird';
import { Product, ProductModel } from '../models/product';

export class ProductService {
    static get productAttributes() {
        return ['code', 'name', 'cost_price', 'sales_price']
    }

    private static _product
    static get product() {
        return ProductService._product
    }

    createProduct({ code, name, cost_price, sales_price }: ProductModel) {
        return Product.create({ code, name, cost_price, sales_price })
            .then(p => this.getProductByCode(p!.code))
    }

    async validateUpdate(code: number, new_price: number) {
        try {
            const product = await Product.findOne({ where: { code } })

            if (!product) {
                throw new Error('Product not found.')
            }

            // Valida se o novo preço de venda não é menor que o preço de custo
            if (new_price > product.cost_price) {
                // Valida se a variação de preço é de 10%
                const highestLimit = product.sales_price * 1.10
                const lowestLimit = product.sales_price * 0.90

                if(new_price === highestLimit || new_price === lowestLimit){
                    
                }
                return 'The price variation is different of 10%'
            }
            return 'Sales_price is lower than cost_price.'
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async updatePrice(code: number, new_price: number) {
        try {
            const product = await Product.findOne({ where: { code } })

            if (!product) {
                throw new Error('Product not found.')
            }
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    getAllProducts() {
        return Product.findAll()
    }

    getProductByCode(code: number) {
        return Product.findOne({ where: { code: code } })
    }
}