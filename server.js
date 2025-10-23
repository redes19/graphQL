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
        person: async (_, {id}) => {
            const session = driver.session();
            try {
                const result = await session.run(
                    "MATCH (p: Person {id :$id} RETURN p)",
                    {id}
                );

                if(result.records.length === 0) return null;

                const person = result.records[0].get("p");
                return {
                    id : person.id,
                    firstname : person.firstname,
                    lastname: person.lastname,
                    name: person.name,
                    birth: person.birth ? parseInt(person.birth) : null,
                };

            } finally{
                await session.close();
            }
        }
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
