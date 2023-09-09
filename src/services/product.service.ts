import { Product } from '../models/product';
import { calculatePriceVariation } from '../utils';

export class ProductService {
    async validateUpdate(code: number, new_price: number){
        try {
            const product = await Product.findOne({ where: { code } })
            let message = ''

            if (!product) {
                return { code: code, message: 'Produto não encontrado.', new_price: new_price }
            }

            const { cost_price, sales_price } = product

            // Valida se o novo preço de venda é menor que o preço de custo
            if (new_price < cost_price) {
                message += 'Preço de venda é menor que o preço de custo.\n'
            }

            // Valida se a variação de preço é de 10%
            const { highestLimit, lowestLimit } = calculatePriceVariation(sales_price)
            if (new_price !== highestLimit && new_price !== lowestLimit) {
                message += `A variação de preço é diferente de 10%. O novo preço deve ser ${highestLimit} ou ${lowestLimit}.`
            }

            return {...product.dataValues, message: message, new_price: new_price}
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    async updatePrice(code: number, new_price: number) {
        try {
            const product = await Product.findOne({ where: { code } })

            if (!product) {
                throw new Error('Produto não encontrado.')
            }

            product.sales_price = new_price
            product.save()

            return product
        }
        catch (error) {
            throw new Error(error.message)
        }
    }

    getAllProducts() {
        return Product.findAll()
    }

    getProductByCode(code: number) {
        return Product.findByPk(code)
    }
}