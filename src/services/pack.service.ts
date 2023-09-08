import { Pack, PackModel } from "../models/pack";
import { IUpdate } from "../routers/product.router";
import { ProductService } from "./product.service";

export class PackService {
    productService = new ProductService()

    async getPackByProductCode(product_code: number) {
        return await Pack.findOne({ where: { pack_id: product_code } })
    }

    async validatePackUpdate(pack: PackModel, product: IUpdate, productsToValidate: IUpdate[]) {
        // Valida se o pacote é valido
        const isPackValid = this.isPackValid(pack, product);
        if (!isPackValid) {
            return this.createErrorMessage(product.product_code, 'O pacote não é um produto válido');
        }
        
        // Valida se o produto que forma o pacote é valido
        const packUnity = await this.productService.getProductByCode(pack.product_id);
        if (!packUnity) {
            return this.createErrorMessage(product.product_code, 'O produto do pacote não foi encontrado');
        }  
    
        // Valida se o produto está presente na lista da requisição
        const packUnityValidate = this.findProductInValidationList(packUnity.code, productsToValidate);
        if (!packUnityValidate) {
            return this.createErrorMessage(product.product_code, 'O produto do pacote não está presente no arquivo');
        }
        
        // Valida se o preço do pacote está na regra do (preço produto * quantidade no pacote)
        const correctPackagePrice = this.calculateCorrectPackagePrice(packUnityValidate.new_price, pack.qty);
        if (correctPackagePrice !== product.new_price) {
            return this.createErrorMessage(product.product_code, `O preço do pacote deve ser igual à soma do preço das unidades: ${correctPackagePrice}`);
        }
        
        return this.productService.validateUpdate(product.product_code, product.new_price);
    }
    
    isPackValid(pack: PackModel, product: IUpdate) {
        const packProduct = this.productService.getProductByCode(product.product_code);
        return packProduct !== null;
    }
    
    createErrorMessage(productCode: number, message: string) {
        return { product: { code: productCode }, message };
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