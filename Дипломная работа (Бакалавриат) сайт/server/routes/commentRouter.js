import { Router } from "express";
import commentController from "../controllers/commentController.js";

const CommentRouter = Router()

CommentRouter.post('/', commentController.create)
CommentRouter.get('/', commentController.getAll)

export default CommentRouter