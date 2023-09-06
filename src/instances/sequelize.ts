import { Sequelize } from 'sequelize'

const db = 'shopper'
const username = 'root'
const password = 'q1w2e3r4'

export const sequelize = new Sequelize(db, username, password, {
  dialect: "mysql",
  port: 3306,
  define: {
    timestamps: false,
  }
});

sequelize.authenticate()