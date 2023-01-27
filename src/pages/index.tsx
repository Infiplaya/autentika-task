import Head from "next/head";
import { gql } from "@apollo/client";
import client from "@/apollo-client";
import Image from "next/image";
import { Character, Info } from "@/types/characters";
import styled from "styled-components";
import Link from "next/link";

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

const Container = styled.section`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CharacterCard = styled.div`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 300px;
  height: 300px;
`;

const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 20px;
  align-items: center;
  justify-items: center;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: gql`
      query Characters {
        characters {
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
    `,
  });

  return {
    props: {
      firstCharacters: data.characters.results,
      info: data.characters.info,
    },
  };
}

export default function Home({
  firstCharacters,
  info,
}: {
  firstCharacters: Character[];
  info: Info;
}) {
  return (
    <>
      <Head>
        <title>Autentika Task</title>
        <meta name="description" content="Autentika task app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <CharactersGrid>
            {firstCharacters.map((character) => (
              <Link
                href={`character/${character.id}`}
                key={character.id}
                style={{ textDecoration: "none" }}
              >
                <CharacterCard>
                  <Image
                    src={character.image}
                    alt="Character"
                    width={250}
                    height={250}
                    style={{ width: "250px", height: "250px" }}
                  />
                  <Title>{character.name}</Title>
                </CharacterCard>
              </Link>
            ))}
          </CharactersGrid>
        </Container>
      </Main>
    </>
  );
}
