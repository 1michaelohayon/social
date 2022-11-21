import { Model, DataTypes } from "sequelize"
import { sequelize } from "../utils/db"
import {
  PaginateOptions,
  PaginationConnection,
  makePaginate,
} from 'sequelize-cursor-pagination';

class Message extends Model {
  static paginate: (this: unknown, queryOptions: PaginateOptions<Message>) => Promise<PaginationConnection<Message>>;
}

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

Message.paginate = makePaginate(Message)

export default Message