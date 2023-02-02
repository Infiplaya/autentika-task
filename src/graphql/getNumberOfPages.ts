import { gql } from "@apollo/client";

export const GET_NUMBER_OF_PAGES = gql`
  query getNumberOfPages {
  characters{
    info {
      pages
    }
  }
}
`;