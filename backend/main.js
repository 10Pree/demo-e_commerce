const express = require('express')
const { connectDB } = require('./src/config/db')
const cookieParser = require('cookie-parser');
const user = require('./src/router/user')
const login = require('./src/router/login')
const app = express()
const port = 8000

app.use(express.json());
app.use(cookieParser())

app.use('/', user)
app.use('/', login )


const startServer = async() =>{
     await connectDB()
     app.listen(port, () =>{
     console.log(`Example app listening at http://localhost:${port}`);
})
}

startServer()