import { gql } from "@apollo/client";

export default gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      name
      email
      createdAt
    }
  }
`;
