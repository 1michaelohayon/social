"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
const sequelize_cursor_pagination_1 = require("sequelize-cursor-pagination");
class Message extends sequelize_1.Model {
}
Message.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    content: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [1, 280]
        }
    },
    likes: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,
    },
    reply: {
        type: sequelize_1.DataTypes.INTEGER,
        references: { model: 'messages', key: 'id' },
        allowNull: true,
    }
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: true,
    modelName: "message"
});
Message.paginate = (0, sequelize_cursor_pagination_1.makePaginate)(Message);
exports.default = Message;
