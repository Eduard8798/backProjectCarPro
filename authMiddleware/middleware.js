const jwt = require('jsonwebtoken')
const {secret} = require('../config')

module.exports = function (req,res,next) {
    if (req.method === "OPTIONS"){
        next()
    }
    try{
const token = req.headers.authorization.split(' ')[1]
        if (!token){
         return    res.status(400).json({message: ' User not auth'})
        }
        const decodedData = jwt.verify(token,secret)
        req.user = decodedData
        next()
    }catch (e){
        console.log(e)
        return res.status(400).json({message: ' User not auth'})
    }
}
