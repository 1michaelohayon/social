import Message from "./message";
import User from "./user";
import likedMessages from "./likedMessages";

User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });

User.belongsToMany(Message, { through: likedMessages, foreignKey: "userId" });
Message.belongsToMany(User, { through: likedMessages, foreignKey: "messageId" });

const models = { User, Message, likedMessages };
export default models ;