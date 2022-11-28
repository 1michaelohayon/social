import { Model, DataTypes } from "sequelize"
import { sequelize } from "../utils/db"

class User extends Model { }

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
      len: [2, 70]
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 40]
    }
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pictureUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profileName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [2, 40]
    }
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: 'user'
})


export default User