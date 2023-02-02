import Head from "next/head";
import client from "@/apollo-client";
import styled from "styled-components";
import { GetStaticProps } from "next";
import Image from "next/image";
import { CharacterData, SelectedCharacter } from "@/types/specificCharacter";
import { Character, Data } from "@/types/characters";
import { GET_CHARACTERS } from "@/graphql/getCharacters";
import { GET_SPECIFIC_CHARACTER } from "@/graphql/getSpecificCharacter";
import { GET_NUMBER_OF_PAGES } from "@/graphql/getNumberOfPages";

export const getStaticPaths = async () => {
  // Get the data about number of total pages
  const { data }: { data: Data } = await client.query({
    query: GET_NUMBER_OF_PAGES,
  });

  const NUMBER_OF_PAGES = data.characters.info.pages;

  let allCharacters: Array<Character> = [];
  for (let page = 1; page <= NUMBER_OF_PAGES; page++) {
    const { data }: { data: Data } = await client.query({
      query: GET_CHARACTERS,
      variables: { page },
    });
    // concatenate the data from this page to the existing data
    allCharacters = allCharacters.concat(data.characters.results);
  }
  const paths = allCharacters.map((character) => ({
    params: { id: character.id },
  }));

  return { paths, fallback: "blocking" };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data }: { data: CharacterData } = await client.query({
    query: GET_SPECIFIC_CHARACTER,
    variables: { characterId: params?.id },
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

  @media (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0;
    width: 100%;
    gap: 0;
  }
`;

const InfoSection = styled.section`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  @media (max-width: 1024px) {
    padding-top: 0;
  }
`;

const CharacterProfile = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  @media (max-width: 1024px) {
    padding-bottom: 0;
  }
`;

const Episodes = styled.div`
  width: 50%;

  @media (max-width: 1024px) {
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
