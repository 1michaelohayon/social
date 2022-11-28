"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class likedMessages extends sequelize_1.Model {
}
likedMessages.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true
    },
    messageId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'messages', key: 'id' },
        primaryKey: true,
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'likedMessages'
});
exports.default = likedMessages;
