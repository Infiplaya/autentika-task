import Head from "next/head";
import { gql } from "@apollo/client";
import client from "@/apollo-client";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Image from "next/image";
import { SelectedCharacter } from "@/types/specificCharacter";

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

const CharacterTitle = styled.h1`
  font-size: 44px;
  text-align: center;
  color: black;
`;

const CharacterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  padding: 20px;
  justify-content: center;
  gap: 40px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width: 100%;
  }
`;

const InfoSection = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CharacterProfile = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Episodes = styled.div`
  width: 33%;

  @media (max-width: 600px) {
    width: 100%;
  }
`;

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
      <CharacterGrid>
        <CharacterProfile>
          <Image
            src={character.image}
            alt="Character"
            width={400}
            height={400}
          />
          <CharacterTitle>{character.name}</CharacterTitle>
        </CharacterProfile>

        <InfoSection>
          <div>
            <h3>Gender:</h3>
            <p>{character.gender}</p>
          </div>
          <div>
            <h3>Status</h3>
            <p>{character.status}</p>
          </div>
          <div>
            <h3>Species</h3>
            <p>{character.species}</p>
          </div>
          <div>
            <h3>List of episodes</h3>
            <Episodes>
              {character.episode.map((episode) => episode.episode).join(", ")}
            </Episodes>
          </div>
          <div>
            <h3>Current Dimension</h3>
            <p>{character.location.dimension}</p>
          </div>
          <div>
            <h3>Original dimension</h3>
            <p>{character.origin.dimension}</p>
          </div>
        </InfoSection>
      </CharacterGrid>
    </>
  );
}
