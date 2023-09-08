import * as Sequelize from "sequelize";
import { sequelize } from "../instances/sequelize";

interface ProductAddModel {}

export interface ProductModel extends Sequelize.Model<ProductModel> {
    code: number
    name: string
    cost_price: number
    sales_price: number
}

export const Product = sequelize.define<ProductModel, ProductAddModel>('products', {
    code: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    cost_price: {
        type: Sequelize.DECIMAL,
        get() {
            const rawValue = this.getDataValue('cost_price');
            return parseFloat(rawValue);
        },
    },
    sales_price: {
        type: Sequelize.DECIMAL,
        get() {
            const rawValue = this.getDataValue('sales_price');
            return parseFloat(rawValue);
        },
    },
})