"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class follower extends sequelize_1.Model {
}
follower.init({
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true
    },
    followerId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: { model: 'users', key: 'id' },
        primaryKey: true
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'followers'
});
exports.default = follower;
