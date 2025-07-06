const express = require('express')
const mongoose = require("mongoose");

const app = express()

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://eduard:clean2341@cluster0.4f7oiac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
     app.listen(PORT, ()=> console.log(`server start ${PORT}`))
    }
    catch (e){
        console.log('error',e)
    }
}

start()
