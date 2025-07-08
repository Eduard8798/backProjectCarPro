const User = require('./models/User')
const Role = require('./models/Role')
const bcryptjs = require('bcryptjs')
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const {secret} = require('./config')
const generateAccessToken = (id, role) => {
    const payload = {
        id,
        role
    }
    return jwt.sign(payload, secret, {expiresIn: '24h'})
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'error registration', errors})
            }
            const {username, password} = req.body
            const candidate = await User.findOne({username})
            if (candidate) {
                return res.json({message: "error , candidate was created"})
            }
            const hashPassword = bcryptjs.hashSync(password, 5)
            const userRole = await Role.findOne({value: 'USER'})
            const user = new User({username, password: hashPassword, role: [userRole.value]})
            await user.save()
            return res.json({message: 'user success create'})
        } catch (e) {
            console.log('errorController', e)
            res.status(400).json({message: "error registration"})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = req.body
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `client ${username} was not found`})
            }
            const validPassword = bcryptjs.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `password not valid`})
            }
            const token = generateAccessToken(user._id, user.role)
            return res.json({token})
        } catch (e) {
            console.log('errorController', e)
            res.status(400).json({message: "error login"})
        }
    }

    async getUsers(req, res) {
        try {
const users = await User.find()
            res.json(users)
        } catch (e) {
            console.log('errorController', e)
            res.status(400).json({message: "error getUsers"})
        }
    }
}

module.exports = new authController()
