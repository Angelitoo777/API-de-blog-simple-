import { Post } from '../models/post.model.js'

export class PostServices {
  static async getPopularPostFromDB () {
    try {
      const posts = await Post.findAll({
        order: [['views_count', 'DESC']],
        limit: 10,
        attributes: ['id', 'title', 'content', 'authorId', 'views_count']
      })

      return posts.map(post => post.toJSON())
    } catch (e) {
      throw new Error(e)
    }
  }

  static async incrementPostViewCount (postId) {
    try {
      await Post.increment('views_count', { by: 1, where: { id: postId } })
    } catch (e) {
      console.error(e)
    }
  }
}
