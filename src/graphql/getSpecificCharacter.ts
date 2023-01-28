import { gql } from "@apollo/client";

export const GET_SPECIFIC_CHARACTER = gql`
query Character($characterId: ID!) {
  character(id: $characterId) {
    id
    name
    image
    gender
    episode {
      episode
    }
    status
    location {
      dimension
    }
    origin {
      dimension
    }
    species
  }
}
`