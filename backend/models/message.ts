import { Model, DataTypes } from "sequelize"
import { sequelize } from "../utils/db"

class Message extends Model {}

Message.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  likes: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: "message"
})


export default Message