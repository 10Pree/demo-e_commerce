const express = require('express')
const { connectDB } = require('./src/config/db')
const cookieParser = require('cookie-parser');
const user = require('./src/router/user')
const login = require('./src/router/login')
const auth = require('./src/router/Auth')
const product = require('./src/router/product')
const orders = require('./src/router/orders')
const app = express()
const port = process.env.POST

app.use(express.json());
app.use(cookieParser())

app.use('/', user)
app.use('/', login )
app.use('/', auth)
app.use('/', product)
app.use('/', orders)

const startServer = async() =>{
     await connectDB()
     app.listen(port, () =>{
     console.log(`Example app listening at http://localhost:${port}`);
})
}

startServer()