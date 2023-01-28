import { gql } from "@apollo/client";

export const GET_CHARACTERS = gql`
  query Characters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
      info {
        next
        pages
      }
      results {
        id
        name
        image
      }
    }
  }
`;