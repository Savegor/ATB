import { Router } from "express";
import BrandController from './../controllers/brandController.js';

const brandRouter = Router()

brandRouter.post('/', BrandController.create)
brandRouter.get('/', BrandController.getAll)
// brandRouter.delete('/', )

export default brandRouter