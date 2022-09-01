const bodyParser = require("body-parser");
const cors = require("cors");
const express = require("express");
const port = process.env.PORT || 4000;
const app = express();
const typeDefinition = "type Query { greeting: String }";
const resolverObject = {
  Query: {
    greeting: () => "Hello I am Trevor D'Costa !!",
  },
};

const { makeExecutableSchema } = require("graphql-tools");
const schema = makeExecutableSchema({
  typeDefs: typeDefinition,
  resolvers: resolverObject,
});
app.use(cors(), bodyParser.json());

const { graphiqlExpress, graphqlExpress } = require("apollo-server-express");
app.use("/graphql", graphqlExpress({ schema }));
app.use("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

app.listen(port, () => console.info(`Server started on port ${port}`));
