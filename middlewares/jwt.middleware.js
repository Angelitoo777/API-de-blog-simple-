import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model.js'
dotenv.config()

export async function jwtMiddleware (req, res, next) {
  const token = req.cookies.access_token
  const jwtSecret = process.env.JWT_SECRET

  if (!req.session) {
    req.session = {}
  }

  if (!token) {
    req.userId = null

    return next()
  }

  try {
    const data = jwt.verify(token, jwtSecret)
    req.session.user = data

    const user = await User.findByPk(data.id)

    req.userId = user.id
  } catch (e) {
    req.session = null
  }

  next()
}
