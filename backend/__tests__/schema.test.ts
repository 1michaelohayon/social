import { ApolloServer } from 'apollo-server-express'
import typeDefs from "../schema";
import resolvers from "../resolvers";
import gql from 'graphql-tag';


describe('dummy test', () => {
  it('works', () => {
    expect(1).toBe(1);
  });
});

describe('createSchema', () => {
  const apolloServer = new ApolloServer({
    resolvers,
    typeDefs,
  });


  it('creates schema without errors', () => {

    expect(apolloServer).toBeDefined();
  });

  it("can login", async () => {
    const result = await apolloServer.executeOperation({
      query: gql`
        mutation{
          login(username: "test@test.com", password: "test") {
            value
          }
        }`

    })
    expect(result?.data?.login?.value).toBeDefined();
  });


  it("validates against non-email usernames", async () => {
    const result = await apolloServer.executeOperation({
      query: gql`
        mutation{
          addUser(username: "notEmail", password: "sisma", name: "chicken") {
            name
            username
          }
        }`

    })
    expect(result.errors?.toString()).toContain("Validation isEmail on username failed");
  });


  it("validates against short passwords", async () => {
    const result = await apolloServer.executeOperation({
      query: gql`
        mutation{
          addUser(username: "email@email.com", password: "1", name: "chicken") {
            name
            username
          }
        }`

    })
    expect(result.errors?.toString()).toContain("Password must be at least 3 characters");
  });
})