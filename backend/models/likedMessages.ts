import { Model, DataTypes } from "sequelize"
import { sequelize } from "../utils/db"

class likedMessages extends Model { }

likedMessages.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    primaryKey: true

  },
  messageId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'messages', key: 'id' },
    primaryKey: true,

  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  
  modelName: 'likedMessages'
})
export default likedMessages