import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import { sequelize } from './db.js'
import cors from 'cors';
import router from './routes/index.js';
import { errorHandler } from './middleware/ErrorHandongMiddleware.js';
import fileUpload from 'express-fileupload';

const __dirname = path.resolve()
dotenv.config()
const PORT = process.env.PORT ?? 3002

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload())
app.use('/api', router)

// Обработка ошибок
app.use(errorHandler)

app.get('/', (req, res) => {
    res.status(200).json({message:"WORKING!!"})
})

const start = async () => {
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        })
    }catch (e){
        console.log(e)
    }
}

start()