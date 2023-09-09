import { Pack, PackModel } from "../models/pack";
import { ProductModel } from "../models/product";
import { IUpdate } from "../routers/product.router";
import { ProductService } from "./product.service";

export class PackService {
    productService = new ProductService()

    async getPackByProductCode(product_code: number) {
        return await Pack.findOne({ where: { pack_id: product_code } })
    }

    async validatePackUpdate(pack: PackModel, product: IUpdate, productsToValidate: IUpdate[]) {
        // Valida se o pacote é valido
        const packProduct = await this.productService.getProductByCode(product.product_code)
        if (!packProduct) {
            return this.createErrorMessage(product, 'O pacote não é um produto válido', packProduct);
        }

        // Valida se o produto que forma o pacote é valido
        const packUnity = await this.productService.getProductByCode(pack.product_id);
        if (!packUnity) {
            return this.createErrorMessage(product, 'O produto do pacote não foi encontrado', packProduct);
        }

        // Valida se o produto está presente na lista da requisição
        const packUnityValidate = this.findProductInValidationList(packUnity.code, productsToValidate);
        if (!packUnityValidate) {
            return this.createErrorMessage(product, 'O produto do pacote não está presente no arquivo', packProduct);
        }

        // Valida se o preço do pacote está na regra do (preço produto * quantidade no pacote)
        const correctPackagePrice = this.calculateCorrectPackagePrice(packUnityValidate.new_price, pack.qty);
        if (correctPackagePrice !== product.new_price) {
            return this.createErrorMessage(product, `O preço do pacote deve ser igual à soma do preço das unidades: ${correctPackagePrice}`, packProduct);
        }

        return this.productService.validateUpdate(product.product_code, product.new_price);
    }

    createErrorMessage(product: IUpdate, message: string, packProduct: ProductModel) {
        if (packProduct) {
            return { ...packProduct.dataValues, message: message, new_price: product.new_price }
        };

        return { code: product.product_code, message: message, new_price: product.new_price };
    }

findProductInValidationList(productCode: number, productsToValidate: IUpdate[]) {
    return productsToValidate.find((p) => p.product_code === productCode);
}

calculateCorrectPackagePrice(unitPrice: number, quantity: number) {
    return Math.ceil((unitPrice * quantity) * 100) / 100;
}

getAllPacks() {
    return Pack.findAll()
}

getPackById(id: number) {
    return Pack.findByPk(id)
}
}