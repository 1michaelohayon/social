"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const schema_1 = __importDefault(require("../schema"));
const resolvers_1 = __importDefault(require("../resolvers"));
describe('createSchema', () => {
    it('creates schema without errors', () => {
        const apolloServer = new apollo_server_express_1.ApolloServer({
            resolvers: resolvers_1.default,
            typeDefs: schema_1.default,
        });
        expect(apolloServer).toBeDefined();
    });
});
