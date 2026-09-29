import { Router } from "express";
import typeController from "../controllers/typeController.js";
import checkRoleMiddleware from "../middleware/checkRoleMiddleware.js";

const typeRouter = Router()

typeRouter.post('/', checkRoleMiddleware('ADMIN') , typeController.create)
typeRouter.get('/', typeController.getAll)

export default typeRouter