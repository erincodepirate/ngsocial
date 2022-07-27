import express, { Application } from 'express';
import { ApolloServer, Config, gql } 
  from 'apollo-server-express';
import { IResolvers } from '@graphql-tools/utils';

// express stuff
const PORT = 8080;
const app: Application = express();

// graphql stuff
const typeDefs = gql`type Query {message: String!}`;
const resolvers: IResolvers = {
  Query: {
    message: () => 'It works!'
  }
};

const config: Config = {
  typeDefs: typeDefs,
  resolvers: resolvers
};

/*app.get('/', (req, res) =>
  res.send('Express is successfully running!')); 
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});*/

async function startApolloServer(config: Config) {
  const PORT = 8080;
  const app: Application = express();
  const server: ApolloServer =
    new ApolloServer(config);
  await server.start();
  server.applyMiddleware({
    app,
    path: '/graphql'
  });
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}
startApolloServer(config);