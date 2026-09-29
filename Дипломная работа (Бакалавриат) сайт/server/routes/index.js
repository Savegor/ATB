import { Router } from "express";
import userRouter  from "./userRouter.js";
import typeRouter from "./typeRouter.js";
import brandRouter from "./brandRouter.js";
import deviceRouter from "./deviceRoutes.js";
import CommentRouter from "./commentRouter.js";

const router = Router()

router.use('/user', userRouter)
router.use('/type', typeRouter)
router.use('/brand', brandRouter)
router.use('/device', deviceRouter)
router.use('/comment', CommentRouter)


export default router