const { gql } = require("apollo-server");

const typeDefs = gql`
    type User {
        id: ID!
        name: String!
        age: Int
    }

    type Query {
        hello : String
        users : [User]
    }

`;

module.exports= {typeDefs}