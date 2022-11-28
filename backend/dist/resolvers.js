"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const models_1 = __importDefault(require("./models"));
const apollo_server_core_1 = require("apollo-server-core");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("./utils/config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const follower_1 = __importDefault(require("./models/follower"));
const graphql_subscriptions_1 = require("graphql-subscriptions");
const sequelize_1 = require("sequelize");
const pubsub = new graphql_subscriptions_1.PubSub();
const { User, Message, likedMessages } = models_1.default;
const resolvers = {
    Query: {
        me: (_root, _args, context) => {
            return context.currentUser;
        },
        usersCount: () => __awaiter(void 0, void 0, void 0, function* () { return User.count(); }),
        messagesCount: () => __awaiter(void 0, void 0, void 0, function* () { return Message.count(); }),
        allMessages: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const messages = yield Message.paginate({
                where: { reply: null },
                include: [
                    { model: User, as: "user" },
                    { model: likedMessages, as: "likedBy", include: [{ model: User, as: "user" }] },
                ],
                limit: 5,
                order: [['createdAt', 'DESC']],
                after: args.after,
            });
            return messages;
        }),
        findReplies: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Message.findAll({
                where: { [sequelize_1.Op.or]: [{ reply: args.messageId }, { id: args.messageId }] },
                include: [
                    { model: User, as: "user" },
                    { model: likedMessages, as: "likedBy", include: [{ model: User, as: "user" }] },
                ],
            });
        }),
        searchMessages: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            return yield Message.findAll({
                where: { content: { [sequelize_1.Op.iLike]: `%${args.search}%` } },
                include: [
                    { model: User, as: "user" },
                    { model: likedMessages, as: "likedBy", include: [{ model: User, as: "user" }] },
                ],
                limit: 5,
            });
        }),
        allUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            const users = yield User.findAll({
                include: [
                    { model: Message },
                    { model: likedMessages, include: [{ model: Message, as: "message" }] },
                    { model: follower_1.default, as: "following" },
                    { model: follower_1.default, as: "followers" },
                ]
            });
            return users;
        }),
        findUser: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User.findOne({
                where: { profileName: args.profileName },
                include: [
                    { model: Message, include: [{ model: User, as: "user" }] },
                    { model: likedMessages, include: [{ model: Message, as: "message" }] },
                    { model: follower_1.default, as: "following" },
                    { model: follower_1.default, as: "followers" },
                ]
            });
            if (!user) {
                throw new apollo_server_core_1.UserInputError("User not found");
            }
            return user;
        }),
    },
    Mutation: {
        login: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const user = yield User.findOne({ where: { username: args.username } });
            if (!user) {
                throw new apollo_server_core_1.UserInputError("User not found");
            }
            const password = yield bcrypt_1.default.compare(args.password, user.dataValues.passwordHash);
            if (!password) {
                throw new apollo_server_core_1.UserInputError("Incorrect Password");
            }
            const userForToken = {
                id: user.dataValues.id,
                username: user.dataValues.username,
                name: user.dataValues.name
            };
            return { value: jsonwebtoken_1.default.sign(userForToken, config_1.default.SECRET) };
        }),
        addMessage: (_root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.currentUser) {
                throw new apollo_server_core_1.AuthenticationError("Not logged in");
            }
            let newMessage = {
                content: args.content,
                userId: context.currentUser.id,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            if (args.reply) {
                const reply = Object.assign(Object.assign({}, newMessage), { reply: args.reply });
                newMessage = reply;
            }
            const message = yield Message.create(newMessage);
            const messageWithUser = yield Message.findByPk(message === null || message === void 0 ? void 0 : message.dataValues.id, {
                include: [
                    { model: User, as: "user" },
                ]
            });
            yield pubsub.publish("MESSAGE_ADDED", { messageAdd: messageWithUser });
            return message;
        }),
        addLike: (_root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.currentUser) {
                throw new apollo_server_core_1.AuthenticationError("Not logged in");
            }
            const message = yield Message.findByPk(args.messageId);
            if (!message) {
                throw new apollo_server_core_1.UserInputError("Message not found");
            }
            try {
                yield likedMessages.create({ messageId: args.messageId, userId: context.currentUser.id });
                message.likes = message.likes + 1;
                const saved = message.save();
                return yield saved;
            }
            catch (error) {
                console.log(error);
            }
        }),
        follow: (_root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.currentUser) {
                throw new apollo_server_core_1.AuthenticationError("Not logged in");
            }
            const newFollow = {
                followerId: context.currentUser.id,
                userId: args.userId
            };
            return yield follower_1.default.create(newFollow);
        }),
        addUser: (_root, args) => __awaiter(void 0, void 0, void 0, function* () {
            const passwordHash = yield bcrypt_1.default.hash(args.password, 10);
            const profileName = args.profileName ? args.profileName : args.username;
            const newUser = {
                username: args.username,
                name: args.name,
                passwordHash: passwordHash,
                profileName: profileName,
                createdAt: new Date(),
                updatedAt: new Date()
            };
            return yield User.create(newUser);
        }),
        editUser: (_root, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (!context.currentUser) {
                throw new apollo_server_core_1.AuthenticationError("Not logged in");
            }
            const user = yield User.findByPk(context.currentUser.id);
            if (!user) {
                throw new apollo_server_core_1.UserInputError("User not found");
            }
            const updatedUser = {
                profileName: args.profileName,
                pictureUrl: args.pictureUrl,
                updatedAt: new Date()
            };
            return yield user.update(updatedUser);
        })
    },
    Subscription: {
        messageAdd: {
            subscribe: () => pubsub.asyncIterator(['MESSAGE_ADDED']),
        },
    },
};
exports.default = resolvers;
