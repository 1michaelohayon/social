"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = __importDefault(require("./message"));
const user_1 = __importDefault(require("./user"));
const likedMessages_1 = __importDefault(require("./likedMessages"));
const follower_1 = __importDefault(require("./follower"));
user_1.default.belongsToMany(message_1.default, { through: likedMessages_1.default, foreignKey: "userId" });
message_1.default.belongsToMany(user_1.default, { through: likedMessages_1.default, foreignKey: "messageId" });
user_1.default.hasMany(likedMessages_1.default, { foreignKey: "userId" });
message_1.default.hasMany(likedMessages_1.default, { as: "likedBy", foreignKey: "messageId" });
likedMessages_1.default.belongsTo(user_1.default, { as: "user", foreignKey: "userId" });
likedMessages_1.default.belongsTo(message_1.default, { as: "message", foreignKey: "messageId" });
user_1.default.hasMany(follower_1.default, { as: "following", foreignKey: "followerId" });
user_1.default.hasMany(follower_1.default, { as: "followers", foreignKey: "userId" });
user_1.default.hasMany(message_1.default, { foreignKey: "userId" });
message_1.default.belongsTo(user_1.default, { foreignKey: "userId" });
const models = { User: user_1.default, Message: message_1.default, likedMessages: likedMessages_1.default };
exports.default = models;