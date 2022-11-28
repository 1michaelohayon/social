"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../utils/db");
class User extends sequelize_1.Model {
}
User.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    passwordHash: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    pictureUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    profileName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, {
    sequelize: db_1.sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'user'
});
exports.default = User;
