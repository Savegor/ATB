import { Comment, Device, User } from '../db.js'
import { ApiError } from '../error/apiError.js'

class CommentController {
    async create(req, res) {
        try {
            const { deviceId, userId, text } = req.query
            const device = await Device.findOne({where:{id: deviceId}})
            // const user = await User.findOne({where:{id: userId}})
            // if (userId && user && device && deviceId){
            if (device && deviceId){
                const NewComment = await Comment.create({ text, deviceId })
                return res.json(NewComment)
            }
            return next(ApiError.internal("Пользователь или девайс не найден"))
        } catch (e) {
            next(ApiError.badRequest(e.message))
        }

    }

    async getAll(req, res) {
        let { deviceId, userId } = req.query
        let comments
        if (deviceId && !userId) {
            comments = await Comment.findAndCountAll({ where: { deviceId } })
        }
        else if (!deviceId && userId) {
            comments = await Comment.findAndCountAll({ where: { userId } })
        }
        else if (deviceId && userId) {
            comments = await Comment.findAndCountAll({ where: { deviceId, userId } })
        }
        else if (!deviceId && !userId) {
            comments = await Comment.findAndCountAll()
        }
        return res.json(comments)
    }

}

export default new CommentController()