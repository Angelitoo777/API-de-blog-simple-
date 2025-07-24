import { User, Post } from '../models/associations.js'
import { validatePost, validatePickPost } from '../schemas/posts.validation.js'
import { PostServices } from '../services/post.services.js'
import { client } from '../database/redis.js'

export class PostController {
  static async getAllPosts (req, res) {
    const cachedPosts = await client.get('posts')

    if (cachedPosts) {
      return res.json(JSON.parse(cachedPosts))
    }

    const getPosts = await Post.findAll()

    await client.setEx('posts', 3600, JSON.stringify(getPosts))

    return res.status(200).json(getPosts)
  }

  static async getPopularPosts (req, res) {
    try {
      const cachedPosts = await client.get('popular_posts')

      if (cachedPosts) {
        return res.json(JSON.parse(cachedPosts))
      }

      const getPopular = await PostServices.getPopularPostFromDB()

      await client.setEx('popular_posts', 3600, JSON.stringify(getPopular))

      return res.json(getPopular)
    } catch (e) {

    }
  }

  static async getById (req, res) {
    const { id } = req.params

    try {
      const cachedPostId = await client.get(`posts:${id}`)

      if (cachedPostId) {
        return res.json(JSON.parse(cachedPostId))
      }

      const getId = await Post.findByPk(id)

      if (getId === null) {
        return res.status(404).json({ message: 'Post not found' })
      }

      await PostServices.incrementPostViewCount(id)

      await client.del('popular_posts')

      await client.del('posts')

      await client.setEx(`post:${id}`, 300, JSON.stringify(getId))

      return res.status(200).json(getId)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static async createPost (req, res) {
    const authenticatedUserId = req.userId
    const validation = validatePost(req.body)

    if (!validation.success) {
      return res.status(400).json({ message: 'Validation error', error: validation.errors })
    }

    const { title, content } = validation.data

    try {
      const author = await User.findByPk(authenticatedUserId)

      const newPost = await author.createPost({ title, content })

      await client.del('posts')

      return res.status(201).json(newPost)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static async updatePost (req, res) {
    const { id } = req.params
    const validation = validatePickPost(req.body)

    if (!validation.success) {
      return res.status(400).json({ message: 'Validation error', error: validation.errors })
    }

    const { title, content } = validation.data

    try {
      const update = await Post.findByPk(id)

      if (update === null) {
        return res.status(404).json({ message: 'Post not found' })
      }

      update.title = title
      update.content = content
      update.save()

      await client.del('posts')

      return res.status(200).json(update)
    } catch (e) {
      throw new Error(e.message)
    }
  }

  static async deletePost (req, res) {
    const { id } = req.params

    try {
      await Post.destroy({ where: { id } })

      await client.del('posts')

      return res.status(204).send('Deleted')
    } catch (e) {
      throw new Error(e.message)
    }
  }
}
