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
const schema_1 = __importDefault(require("../schema"));
const resolvers_1 = __importDefault(require("../resolvers"));
const graphql_tag_1 = __importDefault(require("graphql-tag"));
describe('dummy test', () => {
    it('works', () => {
        expect(1).toBe(1);
    });
});
describe('createSchema', () => {
    const apolloServer = new apollo_server_express_1.ApolloServer({
        resolvers: resolvers_1.default,
        typeDefs: schema_1.default,
    });
    it('creates schema without errors', () => {
        expect(apolloServer).toBeDefined();
    });
    it("can login", () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const result = yield apolloServer.executeOperation({
            query: (0, graphql_tag_1.default) `
        mutation{
          login(username: "test@test.com", password: "test") {
            value
          }
        }`
        });
        expect((_b = (_a = result === null || result === void 0 ? void 0 : result.data) === null || _a === void 0 ? void 0 : _a.login) === null || _b === void 0 ? void 0 : _b.value).toBeDefined();
    }));
    it("validates against non-email usernames", () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        const result = yield apolloServer.executeOperation({
            query: (0, graphql_tag_1.default) `
        mutation{
          addUser(username: "notEmail", password: "sisma", name: "chicken") {
            name
            username
          }
        }`
        });
        expect((_c = result.errors) === null || _c === void 0 ? void 0 : _c.toString()).toContain("Validation isEmail on username failed");
    }));
    it("validates against short passwords", () => __awaiter(void 0, void 0, void 0, function* () {
        var _d;
        const result = yield apolloServer.executeOperation({
            query: (0, graphql_tag_1.default) `
        mutation{
          addUser(username: "email@email.com", password: "1", name: "chicken") {
            name
            username
          }
        }`
        });
        expect((_d = result.errors) === null || _d === void 0 ? void 0 : _d.toString()).toContain("Password must be at least 3 characters");
    }));
});
