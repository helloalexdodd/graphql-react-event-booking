const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('./config/db');
const graphQlSchema = require('./graphql/schema');
const graphQlResolvers = require('./graphql/resolvers');
const isAuth = require('./middleware/is-auth');

const app = express();

app.use(express.json());
app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true,
  })
);

mongoose();
app.listen('4000', () => console.log(`App initialized on port 4000...`));
