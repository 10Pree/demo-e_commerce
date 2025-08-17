const express = require('express')
const user = require('./src/router/user')
const { connectDB } = require('./src/config/db')
const app = express()
const port = 8000

app.use('/', user)

const startServer = async() =>{
     await connectDB()
     app.listen(port, () =>{
     console.log(`Example app listening at http://localhost:${port}`);
})
}

startServer()