import { gql } from "@apollo/client";

export default gql`
  mutation RegisterUserMutation(
    $name: String!
    $email: String!
    $password: String!
  ) {
    register(name: $name, email: $email, password: $password) {
      name
      email
      createdAt
    }
  }
`;
