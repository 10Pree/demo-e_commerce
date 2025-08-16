const express = require('express')
const user = require('./src/router/user')
const app = express()
const port = 8000

app.use('/', user)

app.listen(port, () =>{
     console.log(`Example app listening at http://localhost:${port}`);
})