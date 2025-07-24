import { PostController } from '../controllers/post.controllers.js'
import { Router } from 'express'
import { jwtMiddleware } from '../middlewares/jwt.middleware.js'

export const routesPost = Router()

routesPost.get('/post', PostController.getAllPosts)
routesPost.get('/post/popular', PostController.getPopularPosts)
routesPost.get('/post/:id', PostController.getById)

routesPost.post('/post', jwtMiddleware, PostController.createPost)
routesPost.patch('/post/:id', jwtMiddleware ,PostController.updatePost)
routesPost.delete('/post/:id', jwtMiddleware, PostController.deletePost)
