import { UserController } from '../controllers/user.controllers.js'
import { Router } from 'express'

export const routesUser = Router()

routesUser.post('/register', UserController.createUser)
routesUser.post('/login', UserController.loginUser)
