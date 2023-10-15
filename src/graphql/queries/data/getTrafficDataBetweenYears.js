import { gql } from "@apollo/client";

export default gql`
  query GetTrafficDataBetweenYears($fromYear: Int, $toYear: Int) {
    getTrafficDataBetweenYears(fromYear: $fromYear, toYear: $toYear) {
      key
      data
      createdAt
    }
  }
`;
