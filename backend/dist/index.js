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
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const schema_1 = require("@graphql-tools/schema");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const ws_1 = require("ws");
const ws_2 = require("graphql-ws/lib/use/ws");
const config_1 = __importDefault(require("./utils/config"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = __importDefault(require("./models"));
const { User, likedMessages, Message } = models_1.default;
const schema_2 = __importDefault(require("./schema"));
const resolvers_1 = __importDefault(require("./resolvers"));
const db_1 = require("./utils/db");
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, db_1.connectToDatabase)();
    const app = (0, express_1.default)();
    const httpServer = http_1.default.createServer(app);
    const schema = (0, schema_1.makeExecutableSchema)({ typeDefs: schema_2.default, resolvers: resolvers_1.default });
    const wsServer = new ws_1.WebSocketServer({
        server: httpServer,
        path: '/',
    });
    const serverCleanup = (0, ws_2.useServer)({ schema }, wsServer);
    const server = new apollo_server_express_1.ApolloServer({
        schema,
        context: ({ req }) => __awaiter(void 0, void 0, void 0, function* () {
            const auth = req ? req.headers.authorization : null;
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jsonwebtoken_1.default.verify(auth.substring(7), config_1.default.SECRET);
                const currentUser = yield User.findByPk(decodedToken.id, { include: [
                        { model: likedMessages, include: [{ model: Message, as: "message" }] },
                    ] });
                return { currentUser };
            }
            else
                return null;
        }),
        plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
            {
                serverWillStart() {
                    return __awaiter(this, void 0, void 0, function* () {
                        return {
                            drainServer() {
                                return __awaiter(this, void 0, void 0, function* () {
                                    yield serverCleanup.dispose();
                                });
                            },
                        };
                    });
                },
            },
        ],
    });
    yield server.start();
    server.applyMiddleware({
        app,
        path: '/'
    });
    httpServer.listen(config_1.default.PORT, () => console.log(`Server is now running on http://localhost:${config_1.default.PORT}`));
});
start();
