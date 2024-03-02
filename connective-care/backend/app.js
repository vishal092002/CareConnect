const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
const userRouter = require("./routes/Middleman")

dotenv.config()

app.use(cors())
app.use(express.json())


// mondgodb account and db needs to be made for this to function properly, when made add it to an env folder so we can utilize it
mongoose.connect()


//routes
app.use("/routes",userRouter)

//tests to see if we can connect to the db
app.get('/test',(req,res)=>{
    if(mongoose.connection.readyState===1){
        res.sendStatus(200)

    } 
    else{
        res.sendStatus(500)
    }
})




//to start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Server is running at ${PORT}`)
})

