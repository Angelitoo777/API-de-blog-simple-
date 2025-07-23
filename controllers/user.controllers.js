import { User } from '../models/user.model.js'
import { validateUser, validatePickUser } from '../schemas/user.validation.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export class UserController {
  static async createUser (req, res) {
    const validation = validateUser(req.body)

    if (!validation.success) {
      return res.status(400).json({ message: 'Validation error', error: validation.errors })
    }

    const { username, email, password } = validation.data
    try {
      const user = await User.findAll({ where: { username, email } })
      if (user.length > 0) {
        return res.json({ message: 'User already exists' })
      }

      const hasshedPassword = await bcrypt.hash(password, 10)

      const newUser = await User.create({ username, email, password: hasshedPassword })

      return res.status(201).json({ username: newUser.username, email: newUser.email, message: 'Successful registration' })
    } catch (e) {
      throw new Error(e)
    }
  }

  static async loginUser (req, res) {
    try {
      const validation = validatePickUser(req.body)
      const { username, password } = validation.data

      if (validation.success) {
        const login = await User.findOne({ where: { username } })
        if (!login) throw new Error('User does not exist')

        const comparePassword = await bcrypt.compare(password, login.password)
        if (!comparePassword) throw new Error('Incorrect password')

        const token = jwt.sign({
          id: login.id,
          email: login.email,
          username: login.username
        },
        process.env.JWT_SECRET, {
          expiresIn: '1hr'
        })

        return res
          .cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000
          })
          .json({
            id: login.id,
            email: login.email,
            username: login.username,
            token,
            message: 'Login successful'
          })
      }
    } catch (e) {
      throw new Error(e)
    }
  }
}
