import { User } from './user.model.js'
import { Post } from './post.model.js'

User.hasMany(Post, {
  foreignKey: 'authorId',
  sourceKey: 'id',
  as: 'posts'
})

Post.belongsTo(User, {
  foreignKey: 'authorId',
  targetKey: 'id',
  as: 'author'
})

export { User, Post }
