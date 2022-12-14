import Message from "./message";
import User from "./user";
import likedMessages from "./likedMessages";
import follower from "./follower";

User.belongsToMany(Message, { through: likedMessages, foreignKey: "userId" });
Message.belongsToMany(User, { through: likedMessages, foreignKey: "messageId" });

User.hasMany(likedMessages, { foreignKey: "userId" });
Message.hasMany(likedMessages, {as: "likedBy", foreignKey: "messageId" });

likedMessages.belongsTo(User, {as: "user", foreignKey: "userId" });
likedMessages.belongsTo(Message, {as: "message", foreignKey: "messageId" });

User.hasMany(follower, {as: "following", foreignKey: "followerId" });
User.hasMany(follower, {as: "followers", foreignKey: "userId" });


User.hasMany(Message, { foreignKey: "userId" });
Message.belongsTo(User, { foreignKey: "userId" });

const models = { User, Message, likedMessages };
export default models ;