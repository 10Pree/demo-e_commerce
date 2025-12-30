const express = require('express')
const { connectDB } = require('./src/config/db')
const cookieParser = require('cookie-parser');
const users = require('./src/router/user')
const login = require('./src/router/login')
const auth = require('./src/router/Auth')
const products = require('./src/router/product')
const orders = require('./src/router/orders')
const payments = require('./src/router/payments')
const categories = require('./src/router/categories')
const images = require('./src/router/images')
const app = express()
const port = process.env.POST
const cors = require('cors')

app.use(express.json());

app.use(cors({
     origin: "http://localhost:3000",
     credentials: true
}))

app.use(cookieParser())

app.use('/', users)
app.use('/', login)
app.use('/', auth)
app.use('/', products)
app.use('/', orders)
app.use('/', payments)
app.use('/', categories)
app.use('/', images)

const startServer = async() =>{
     await connectDB()
     app.listen(port, () =>{
     console.log(`Example app listening at http://localhost:${port}`);
})
}

startServer()