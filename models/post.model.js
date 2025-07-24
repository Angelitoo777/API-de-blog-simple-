import { DataTypes } from 'sequelize'
import { sequelize } from '../database/mysql.js'

export const Post = sequelize.define('posts', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  views_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  }
})
