const express = require('express')
const mongoose = require("mongoose");

const app = express()

const PORT = process.env.PORT || 5000

const start = async () => {
    try {
       //text connect db
     app.listen(PORT, ()=> console.log(`server start ${PORT}`))
    }
    catch (e){
        console.log('error',e)
    }
}

start()
