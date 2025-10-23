const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        age: Int
    }

    type Person {
        id: ID!
        firstname: String
        lastname: String
        name: String
        birth: Int
    }

    type Query {
        hello : String
        users : [User]
        person: [Person]
    }

`;

module.exports= {typeDefs}