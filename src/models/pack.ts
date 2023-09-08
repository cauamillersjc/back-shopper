import * as Sequelize from "sequelize";
import { sequelize } from "../instances/sequelize";

interface PackAddModel {}

export interface PackModel extends Sequelize.Model<PackModel> {
    id: number
    pack_id: number
    product_id: number
    qty: number
}

export const Pack = sequelize.define<PackModel, PackAddModel>('packs', {
    id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    pack_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'products',
            key: 'code'
        }
    },
    product_id: {
        type: Sequelize.BIGINT,
        references: {
            model: 'products',
            key: 'code'
        }
    },
    qty: Sequelize.BIGINT,
})