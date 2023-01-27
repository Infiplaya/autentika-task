import Head from "next/head";
import { gql } from "@apollo/client";
import client from "@/apollo-client";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { SelectedCharacter } from "@/types/specificCharacter";
import { Container, Main, Title } from "@/styles/styles";

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const { data } = await client.query({
    query: gql`
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
    `,
    variables: { characterId: id },
  });

  return {
    props: {
      character: data.character,
    },
  };
};

export default function CharacterPage({
  character,
}: {
  character: SelectedCharacter;
}) {
  return (
    <>
      <Head>
        <title>{character.name}</title>
        <meta name="description" content="Autentika task app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <CharacterGrid>
          <CharacterProfile>
            <Image
              src={character.image}
              alt="Character"
              width={400}
              height={400}
            />
            <Title>{character.name}</Title>
          </CharacterProfile>

          <InfoSection>
            <h3>Status:</h3>
            <p>{character.gender}</p>
            <h3>Species</h3>
            <p>{character.status}</p>
            <h3>Species</h3>
            <p>{character.species}</p>
            <h3>List of episodes</h3>
            {character.episode.map((episode) => episode.episode).join(", ")}
            <h3>Current Dimension</h3>
            <p>{character.location.dimension}</p>
            <h3>Original dimension</h3>
            <p>{character.origin.dimension}</p>
          </InfoSection>
        </CharacterGrid>
      </Main>
    </>
  );
}

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  padding: 20px;
  align-items: center;
  justify-content: center;
`;

const InfoSection = styled.section`
  grid-column: 7 / span 12;
`;

const CharacterProfile = styled.section`
  grid-column: 1 / span 6;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
