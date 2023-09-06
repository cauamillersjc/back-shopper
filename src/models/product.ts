import * as Sequelize from "sequelize";
import { sequelize } from "../instances/sequelize";

export interface ProductModel extends Sequelize.Model<ProductModel> {
    code: number
    name: string
    cost_price: number
    sales_price: number
}

export const Product = sequelize.define('products', {
    code: {
        type: Sequelize.BIGINT,
        primaryKey: true,
    },
    name: Sequelize.STRING,
    cost_price: Sequelize.DECIMAL,
    sales_price: Sequelize.DECIMAL,
})