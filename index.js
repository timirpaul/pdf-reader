require("dotenv").config()
const express = require('express')
const cors = require("cors")
const app = express()
const postRouter = require("./src/routers/postRouter")

const PORT = process.env.PORT || 5000 ; 
require("./src/db/db")


app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.get('/', function (req, res) {
  res.send('Hello World')
})


app.use("/router",postRouter)

app.listen(PORT,(req,res)=>{
    
    console.log(`server running ${PORT} ------`);
})