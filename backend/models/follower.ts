import { Model, DataTypes } from "sequelize"
import { sequelize } from "../utils/db"

class follower extends Model { }

follower.init({
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    primaryKey: true

  },
  followerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'users', key: 'id' },
    primaryKey: true

  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  
  modelName: 'followers'
})
export default follower