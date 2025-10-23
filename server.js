const { ApolloServer, gql } = require("apollo-server");
const { driver } = require("./config");
const { typeDefs } = require("./shema");

// creation resolver
const resolvers = {
    Query: {
        hello: () => "Hello GraphQL",
        users: () => [
            { id: "1",  name: "Alice", age: 25 },
            { id: "2", name: "Bob", age: 30 },
        ],
    },
};


// lancement serveur
const server = new ApolloServer({
    typeDefs,
    resolvers,
});


server
    .listen({ port: 4000 })
    .then(({ url }) => {
        console.log(`Serveur lancé!! GraphQL server ready at ${url}`);
    })
    .catch((err) => console.error("Erreur de démarrage:", err));
