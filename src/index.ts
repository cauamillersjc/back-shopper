import bodyParser = require('body-parser')
import * as express from 'express'
import { productRouter } from './routers/product.router'
import * as cors from 'cors'

const app = express()
const port = 8080

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())

app.use('/products', productRouter)

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})