import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
dotenv.config()

export function jwtMiddleware (req, res, next) {
  const token = req.cookies.access_token
  const jwtSecret = process.env.JWT_SECRET
  req.session = null

  try {
    const data = jwt.verify(token, jwtSecret)
    req.session.user = data
  } catch (e) {
    req.session = null
  }
}
