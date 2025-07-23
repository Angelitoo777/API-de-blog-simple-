import express from 'express'
import cookieParser from 'cookie-parser'
import {sequelize} from './database/mysql.js'
import { User } from './models/user.model.js'
import {routesUser} from './routes/user.routes.js'

const app = express()
const PORT = process.env.PORT ?? 3000

app.use(express.json())
app.use(cookieParser())
app.use('/auth', routesUser)

try {
    await sequelize.sync({force: true})
} catch (e) {
    throw new Error((e))
}

app.get('/', (req, res) =>{
    res.send('hola')
})

app.listen(PORT, () =>{
    console.log('your server is running')
})
