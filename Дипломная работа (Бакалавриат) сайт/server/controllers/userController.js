import jwt from "jsonwebtoken"
import { Basket, User } from "../db.js"
import { ApiError } from "../error/apiError.js"
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'

dotenv.config()

const generateJWT = (id, email, role) => {
    return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, res, next) {
        const { email, password, role } = req.body
        if (!email || !password) {
            return next(ApiError.badRequest("Некоректный email или password"))
        }
        const candidate = await User.findOne({ where: { email } })
        if (candidate) {
            return next(ApiError.badRequest("Пользователь с таким email уже существует"))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({ email, role, password: hashPassword })
        const basket = await Basket.create({ userId: user.id })
        const token = generateJWT(user.id, user.email, user.role)
        
        return res.json({token})
    }
    async login(req, res, next) {
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if (!user) {
            return next(ApiError.internal("Пользователь с таким именем не найден"))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword){
            return next(ApiError.internal("Указан неверный пароль"))
        }
        const token = generateJWT(user.id, user.password, user.role)
        return res.json(token)
    }

    async check(req, res, next) {
        const token = generateJWT(req.user.id, req.user.email, req.user.role)
        return res.json(token)
    }
}

export default new UserController()