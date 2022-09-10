import { ApolloServer } from "apollo-server-micro";
import { typeDefs } from "../../graphql/schema";
import { resolvers } from "../../graphql/resolver";
import Cors from "micro-cors";

// to sort Cors error
const cors = Cors();

// initialize ApolloServer
const apolloServer = new ApolloServer({ typeDefs, resolvers });

// start ApolloServer
const startServer = apolloServer.start();

// export apolloServer
export default cors(async function handler(req: any, res: any) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }
  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
